# First integration scenario (proposed)
All times below are local to Asia/Kolkata. Use synthetic records.
A review moves from Friday to Thursday at 10:00. Its linked one-hour preparation session is Thursday at 18:00. The calendar has a free hour Wednesday at 17:00.

1. Extract the changed review time and identify its linked preparation task.
2. Check availability, duration and dependency order in Python.
3. Propose Wednesday at 17:00. Display a preview and wait for approval.
4. On approval, recheck availability and save once. A repeat approval must not duplicate the change.
5. Read back the saved slot before emitting plan_saved. On failure show the old confirmed slot. If Wednesday fills meanwhile, request a new proposal.

## Proposed interface
POST /runs starts a run and returns its run_id. GET /runs/{id}/events streams ordered SSE records. POST /runs/{id}/approval accepts or declines a specific proposal. The backend owns all three routes.
Every event has run_id, seq, type and data. Example of a synthetic fixture for frontend development:

```json
{"run_id":"demo-01","seq":2,"type":"conflict_found","data":{"task_id":"prep-01","reason":"Preparation starts after the review."}}
```

Emit change_understood, conflict_found, and proposal_ready only when the corresponding work completes. Show plan_saved after verification or run_failed on error. Use the sequence as the SSE id, replay missed records on reconnect and ignore duplicate sequence numbers. Label fixture replay in the UI. Stream only user-facing facts.
