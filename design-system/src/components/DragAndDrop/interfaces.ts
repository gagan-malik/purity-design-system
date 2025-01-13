export interface IIssueData {
  id?: any;
  ticket_number?: any;
  text?: any;
  slug?: any;
  description?: any;
  number?: any;
  issue_id?: any;
  issue_type?: any;
  board_id?: any;
  lane_id?: any;
  priority?: any;
  deadline?: any;
  creator_id?: any;
  issue_type_icon?: string;
  priority_icon?: string;
  assignee?: {
    id?: string | number;
    avatar?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    fullname?: string | null;
  };
  parent_id?: any;
  archived_by?: any;
  watchers?: any;
  created_at?: any;
  archived?: any;
  archived_at?: any;
  incident_classification?: any;
  incident_severity?: any;
  injury_type?: any;
  employee_affected?: any;
  work_shift?: any;
  imageUrl?: any;
  attachmentURL?: string;
  is_achieved?: boolean | null | undefined;
}

export interface IIssuesByLane {
  items: IIssueData[];
  name: string;
  lane_id?: string | number;
  title?: string;
}
