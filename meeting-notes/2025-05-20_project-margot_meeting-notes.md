This meeting covered progress on the Hey Margo voice assistant project for real estate professionals, including technology decisions, demonstrations, and next steps.

### Project Infrastructure

- GitHub repositories have been created; most team members have been added
- Team API account with Anthropic has been set up for all team members
- Discord channels are available for communication
- Drive folder has been created with contact list spreadsheet

### Technology Decisions

- **Frontend**: Next.js confirmed (Aaron demonstrated template)
- **Backend**: FastAPI selected for Python backend
- **Database**: PostgreSQL chosen for its relational capabilities and JSON support
- **Development**: DDEV will provide containerized environment for local development
- **Hosting**: DigitalOcean for deployment

### Frontend Development

- Aaron demonstrated Next.js template with:
    - Server-side and client-side rendering capabilities
    - Health check endpoint for deployment verification
    - Authentication via GitHub integration
    - MUI framework for UI components
- Team discussed potential UI organization with tabs for notes/recordings, contacts, and properties
- Question raised about wrapping web app for mobile/CarPlay integration

### Backend & Database

- Phil is working on connecting FastAPI with the frontend in DDEV
- Team agreed PostgreSQL makes sense for storing structured relationships
- Discussion about how to store audio files (PostgreSQL can handle blob storage)
- Need to establish initial tables (people, properties, events)

### LLM Integration

- Brian demonstrated Cloud Code for working with Claude
- Team needs to determine how to share and organize prompts
- Discussion about storing prompts in the repository

### Next Steps

- [ ]  Chris: Create wireframes for the application UI
- [ ]  Aaron: Implement initial UI pages based on wireframes
- [ ]  Phil: Set up monorepo with DDEV that can run UI, PostgreSQL, and FastAPI locally
- [ ]  Jordan: Research storing audio files in PostgreSQL and identify initial database tables
- [ ]  Ben: Investigate DigitalOcean provisioning and deployment strategies
- [ ]  Ben: Suggest approach for sharing LLM prompts among team
- [ ]  Brian: Add remaining team members to repositories
- [ ]  Brian: Draft LLM language and interactions

### Scheduled Follow-ups

- Meeting at 2pm EST to discuss structured vs. unstructured data approach
- Weekly team meetings will continue on Tuesdays