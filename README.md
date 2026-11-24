# MOKI
Making busy days easier · Homingo HackDays

Day-one repository scaffold. The application, dependency manifests, migrations and credentials will arrive with their implementing branches.

| Area | Owner | First handoff |
| --- | --- | --- |
| frontend/src/components | Frontend | Approval control and plan preview in React |
| frontend/src/workflow | Frontend | Render a sample event, then connect FastAPI SSE to Motion |
| backend/app/api and storage | Backend | Start a run, stream its updates and store the approved change |
| backend/app/agents | Agent developer | ADK with Gemini, returning a structured interpretation of a changed commitment |
| backend/app/orchestration | Taher | Check dependencies, propose a slot, pause for approval and verify the write |
| backend/tests | Shared | Exercise the example in docs/demo-flow.md |
| supabase/migrations | Backend | Version the SQL for tasks and plan changes |

Use one short-lived branch per task. Keep real keys in backend/.env. Only placeholder variable names belong in .env.example. See docs/team-git.md for Windows commands.
