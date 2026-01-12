# DynamicPagination

![Lightning Experience _ Salesforce](https://github.com/user-attachments/assets/761f5105-19c3-4744-b055-ee37459754c9)

Overview
DynamicPagination is a Lightning Web Component (LWC) that provides a dynamic, reusable pagination interface for Salesforce data.
It allows users to:
- Select an object (e.g., Account, Contact, Opportunity).
- Dynamically fetch and choose fields from that object.
- Retrieve records in a paginated format.
- Navigate between pages with First, Previous, Next, Last buttons.
- Adjust the number of records displayed per page (10, 25, 50, 100).
- View a message showing total records and current page status.
- Display results in a dynamic datatable with columns generated based on selected fields.

⚙️ Features
- Object Selection: Fetches available Salesforce objects via Apex (fetchObjectList).
- Field Selection: Retrieves fields for the selected object (fetchFieldsList).
- Dynamic Columns: Builds datatable columns at runtime based on selected fields and datatypes.
- Pagination Controls: Navigate records with First, Previous, Next, and Last buttons.
- Record Size Options: Choose how many records to display per page (10, 25, 50, 100).

