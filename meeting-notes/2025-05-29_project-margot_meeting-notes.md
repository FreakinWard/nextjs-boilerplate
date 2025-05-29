# Project Margot - Data Session Meeting Notes
**Date:** Thursday, May 29, 2025

## Quick Recap

The team discussed various technical updates and challenges, including new features, code merges, and environment setup issues. They explored multiple database approaches for their project, deciding to test SQL, graph databases, and vector embeddings simultaneously while considering the development and infrastructure implications. The team also discussed handling text inputs to Margot through different paths and agreed to extend their development environment to support all three database options for local testing.

## Action Items

### Next Steps
- [ ] **Phil** - Extend Ddev to work with all three database options (PostgreSQL, Neo4j, and Pinecone local emulator)
- [ ] **Phil** - Create a pull request for the Ddev setup with all three database options
- [ ] **Ben** - Review Phil's Ddev pull request
- [ ] **Ben** - Set up a Pinecone index and get an API key for the team
- [ ] **Jordan** - Continue developing the relational database schema and implementation
- [ ] **Brian** - Think about and develop criteria for evaluating the different database approaches
- [ ] **Brian** - Move the Margot Sync meeting from Tuesday to Wednesday next week
- [ ] **Brian** - Catch up with Aaron and fill him in on the meeting discussion
- [ ] **Brian** - Catch up with Dan and discuss backend orchestration needs
- [ ] **Ben** - Continue working on setting up the DigitalOcean infrastructure
- [ ] **Team** - Create 50 standard transcripts and 20 question-answer pairs for testing
- [ ] **Chris and Brian** - Work on the graph database approach during their sailing trip

## Discussion Topics

### Team Updates and Code Challenges

**Recent Developments:**
- **Aaron**: Developed a voice transcription feature over the weekend (unable to present due to work conflict)
- **Philip**: Moved frontend code to different directory (potential merge conflict with Aaron's work)
- **Chris**: Planning to demonstrate quick updates and discuss database ideas with Jordan

**Issues:**
- Meeting was cut short due to Chris's other commitment
- Potential merge conflicts between team members' work

### Ddev Development Environment Setup Demo

Philip demonstrated a new development environment setup using Ddev with the following features:

**Technical Stack:**
- Manages both backend Python and frontend Next.js codebases
- Includes PostgreSQL database
- Uses PM2 for process management
- Detailed documentation in README file

**Current Issues:**
- CI pipeline failing some frontend tests at 95% completion
- Need to merge Philip's changes with Aaron's code
- Brian suggested Aaron should rebase changes against Philip's extensive updates

### Digital Ocean Deployment Planning

**Progress Made:**
- Ben configuring two containers for frontend and backend services
- Cost optimization: consolidating to one container

**Security and Infrastructure:**
- Store secrets temporarily in Google Doc while exploring 1Password shared vault options
- Ben to create Google Doc for secrets
- Set up feature environment in Digital Ocean for development testing

**Follow-up Actions:**
- Brian to discuss rebase requirements with Aaron
- Brian to discuss database options with Dan
- Chris to float database discussion with team

### Database Exploration and Testing Hackathon

The team decided to explore three database approaches simultaneously:

#### 1. SQL Approach
- **Owner**: Jordan
- **Technology**: PostgreSQL
- Continue developing relational database schema and implementation

#### 2. Vector Embeddings Approach
- **Owner**: Ben
- **Technology**: Pinecone
- Focus on vector embeddings for semantic search

#### 3. Graph Database Approach
- **Owners**: Brian and Chris
- **Technology**: Neo4J
- Work on relationship-based data storage

**Testing Strategy:**
- Create mini hackathon with standardized data
- Use 50 standard transcripts and 20 question-answer pairs
- Learn pros and cons of each approach in practical setting

### LLM-Driven Query and Storage Paths

The team outlined two main paths for handling text inputs to Margot:

#### Query Path
**Process Flow:**
1. Text input processed through LLM
2. Converted into database queries
3. Queries executed against database
4. Results used to answer original question

#### Storage Path
**Focus Areas:**
- Information storage and retrieval
- Real estate-specific filters and context
- Generic AI interaction with real estate specialization

**Implementation Details:**
- Prompts include sample SQL queries and database schema information
- Guide LLM in generating appropriate queries
- Maintain real estate domain focus through filters

### Hybrid Database Conflict Resolution

**Challenges Identified:**
- Managing conflicting data from multiple inputs and updates
- Need for data consistency across different sources

**Proposed Solutions:**
- **Hybrid Approach**: Combine SQL, graph, and vector databases
- **Human Intervention**: Manual conflict resolution when needed
- **Timestamp Logic**: Track when data was updated
- **Change Log**: Include audit trail for all updates (Jordan's proposal)

**Storage Strategy:**
- Store both processed facts and raw transcripts
- Maintain data lineage and conflict resolution history

### Local Database Testing Strategy

**Development Approach:**
- Each database type gets its own feature branch
- Local testing preferred over DigitalOcean deployment
- Single source of truth database architecture

**Technical Implementation:**
- Extend ddev to support all three database options
- Local databases persist after rebooting
- Team members can test against feature branches with access to all database types

### Database Testing and Evaluation Discussion

**Evaluation Criteria** (to be documented by Brian):
- **Accuracy**: How well does each approach handle data queries?
- **Flexibility**: Adaptability to changing requirements
- **Cost**: Infrastructure and development costs

**Testing Plan:**
- **Neo4j**: Graph database testing
- **PostgreSQL**: Relational database testing  
- **Pinecone**: Vector embedding testing

**Concerns Raised:**
- **Jordan**: Worried that all solutions might work, making decision criteria crucial
- Need clear methodology for comparing approaches

## Meeting Schedule Changes

- **Margot Sync Meeting**: Moved from Tuesday to Wednesday next week (due to Brian's travel)

## Technical Notes

- PM2 process management for development environment
- CI/CD pipeline needs attention (95% completion rate)
- Local database persistence confirmed across reboots
- Real estate domain specialization through filters and context
- Backend orchestration needed for different database flavors