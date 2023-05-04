// {
//   "description": "string",
//   "hiring_role_process_id": "string",
//   "is_admin_required": true,
//   "name": "string",
//   "step_order": 0
// }
export interface HiringRoleProcessStep {
    id: string,
    admin_assigned_to: string,
    description: string,
    hiring_role_process_id: string,
    is_admin_required: boolean,
    name: string,
    step_order: number
    created_by: string
    updated_by: string
    deleted_by: string
    created_at: string
    updated_at: string
}