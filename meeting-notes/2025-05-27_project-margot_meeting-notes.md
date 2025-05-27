# Voice Recording App - Team Meeting Notes

## Quick Recap

The team discussed wireframe designs and user interface considerations for a voice recording app, focusing on natural language interactions and hands-free operation. They explored data categorization, storage, and retrieval methods, including the use of relational and graph databases, to handle complex relationships between entities and improve data accuracy. The team also debated the merits of different database approaches for their project, considering factors such as query performance, relationship traversal, and integration with external systems like Google Contacts.

## Action Items

### Next Steps
- [ ] **Jordan** - Send along the Postgres database schema and related materials for others to review
- [ ] **Brian** - Research and learn more about graph databases and Neo4j
- [ ] **Brian** - Analyze how many queries would be needed to interact with the Postgres-based structure Jordan proposed
- [ ] **Phil** - Continue working on converting the project to D-Dev and share any significant progress
- [ ] **Brian** - Set up a follow-up meeting for Thursday from 9 to 10 AM
- [ ] **All team members** - Review and think about both the Postgres and graph database approaches before the next meeting

## Discussion Topics

### Voice Recording App Wireframes

The team discussed wireframes for a voice recording app, with Chris presenting designs for recording and managing "drops" - voice recordings that can be accessed and searched. Key decisions and considerations:

- **Natural Language Priority**: The app should prioritize natural language interactions over grid-based interfaces
- **Record Button**: Focus on making the record button easily accessible, potentially making it configurable in size
- **Hands-Free Operation**: Allow users to ask questions directly to the app rather than navigating through a UI, based on feedback from a real estate agent who emphasized the need for hands-free operation while driving

### Information Categorization and Data Integrity

The team discussed categorizing information extracted from drops into **five categories**: entities (people, places, events), insights, and actions.

**Key Challenges Identified:**
- Handling partial entities
- Data integrity issues
- Complexity of combining information from multiple drops

**Proposed Solutions:**
- **Chris**: Manual intervention step before implementing conversational interface
- **Brian**: System to recognize conflicts and ask clarifying questions
- **Aaron**: Incorporate contextual information like navigation data or recent calls to enhance accuracy

### Enhancing Data Confirmation System

The team discussed improving accuracy and reducing user frustration through a confirmation system similar to Google Contacts.

**Proposed Features:**
- Allow Margo to confirm actions with users before performing them
- Simple confirmation system with green checkmarks or red Xs for data connections
- Store complex relationships between objects in the database

### User Data Storage and Parsing

**Current Approach:**
- Store all communications in the short term
- Use entity extraction for both drops and asks

**Long-term Plan:**
- Use an LLM to dynamically fetch and update data through MCP
- Build understanding of client relationships beyond standard contact management systems
- Handle complex interconnections between parties

### Database Options for Project Development

The team compared two main approaches:

#### PostgreSQL Approach (presented by Jordan)
**Advantages:**
- Clear relationship definitions
- Easy indexing
- Prevention of orphan entities
- Person entity type with basic attributes and JSON storage for preferences

#### Graph Database Approach (researched by Brian)
**Advantages:**
- Strong handling of dynamic relationships
- Efficient relationship traversal
- Pattern matching capabilities
- Visual representation of data structure

**Integration Plans:**
- Connect with Google Contacts through an MCP server

### Real Estate Transaction Schema Design

Jordan presented a schema for tracking real estate transactions:

**Entity Types:**
- **Transactions** (top-level entity)
  - Subtypes: purchases, sales, rentals
- **Persons**
- **Events**
- **Actions**
- **Locations** (both properties and business locations)

**Features:**
- Unstructured data fields
- Media storage
- Relationship management between entities

### Graph Databases vs Relational Databases

**Graph Database Benefits (per Brian):**
- Efficient handling of interconnected data through nodes and edges
- Excel at relationship traversal and pattern matching
- Suitable for pathfinding and analyzing connections
- Can integrate with LLMs to enhance factual accuracy

**Concerns Raised:**
- **Jordan**: May be overkill for straightforward querying needs
- **Brian**: Some limitations in maintaining consistency and multi-step reasoning

**Performance Considerations:**
- Relational databases may require large numbers of queries to traverse relationships
- Graph databases designed specifically for relationship-heavy operations

## Technical Notes

- AI tools were used to generate database schema and sample queries
- Natural language queries can be converted to cipher queries for graph databases
- Need to explore whether graph databases could fully replace relational databases for this project

## Next Meeting

**Scheduled:** Thursday, 9-10 AM
**Focus:** Continue exploring graph database vs relational database approaches