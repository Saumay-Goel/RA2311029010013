# Stage 1

## Maintaining Top 'N' Priority Notifications Efficiently

### Problem Statement

As the campus notifications application scales, new notifications stream in constantly. Re-sorting the entire database or a massive array every time a new notification arrives ($O(N \log N)$ time complexity) is highly inefficient and unscalable for real-time priority updates.

### Proposed Architecture: Min-Heap (Priority Queue)

To maintain the top 10 notifications efficiently as new data streams in, I will implement a **Min-Heap (Priority Queue)** of a fixed size $K$ (where $K = 10$).

#### Custom Comparator

The Min-Heap will use a custom comparator based on our established rules:

1. **Primary:** Weight (`Placement` [3] > `Result` [2] > `Event` [1]).
2. **Secondary:** Recency (Latest timestamp).

#### Insertion Logic

1. **Initialization:** As the first 10 notifications arrive, they are simply inserted into the heap.
2. **Streaming:** When the 11th notification (and any subsequent notification) arrives, we compare it against the **root** of the Min-Heap (which represents the _lowest priority_ notification currently in the top 10).
3. **Evaluation:**
   - If the new notification has a **lower priority** than the root, it is discarded immediately.
   - If the new notification has a **higher priority** than the root, we extract (pop) the root and insert the new notification, allowing the heap to re-balance.

#### Time & Space Complexity

- **Time Complexity:** The cost to compare and insert a new incoming notification into a heap of size $K$ is $O(\log K)$. Since $K$ is fixed at 10, this operation effectively runs in **$O(1)$ constant time**.
- **Space Complexity:** The memory footprint remains strictly bounded at $O(K)$, ensuring highly predictable memory consumption regardless of how large the total notification volume grows.
