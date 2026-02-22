// Admin dashboard types for QDaria internal portal

export type UserRole = 'admin' | 'employee' | 'investor';

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar_url?: string;
}

export interface TeamMember {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  title: string;
  bio?: string;
  linkedin?: string;
  department?: string;
  tier: 'Founder' | 'C-Suite' | 'Leadership' | 'Specialist' | 'Intern/Board';
  salary_nok?: number;
  salary_eur?: number;
  salary_tier?: 'ceo' | 'coo' | 'senior' | 'mid' | 'junior';
  equity_percentage?: number;
  vesting_start_date?: string;
  vesting_cliff_months: number;
  vesting_total_months: number;
  contract_status: 'active' | 'pending' | 'terminated';
  employment_type: 'full-time' | 'part-time' | 'intern' | 'flex';
  is_board_member: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  team_member_id: string;
  team_member_name?: string;
  title: string;
  type: 'employment' | 'nda' | 'board_agreement' | 'consulting' | 'other';
  file_path: string;
  file_name: string;
  file_size?: number;
  status: 'active' | 'expired' | 'draft' | 'superseded';
  signed_date?: string;
  start_date?: string;
  expiry_date?: string;
  created_at: string;
}

export interface EquityRecord {
  id: string;
  team_member_id: string;
  team_member_name?: string;
  share_type: 'common' | 'preferred' | 'options' | 'phantom';
  percentage: number;
  vesting_schedule?: {
    cliff_months: number;
    total_months: number;
    accelerated: boolean;
  };
  grant_date?: string;
  notes?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  meeting_type: 'team' | 'board' | 'one_on_one' | 'standup' | 'external';
  start_time: string;
  end_time: string;
  location?: string;
  meeting_link?: string;
  organizer_id?: string;
  organizer_name?: string;
  agenda?: string;
  minutes?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  attendees?: MeetingAttendee[];
}

export interface MeetingAttendee {
  meeting_id: string;
  team_member_id: string;
  team_member_name?: string;
  status: 'invited' | 'accepted' | 'declined' | 'tentative';
}

export interface ChatChannel {
  id: string;
  name: string;
  description?: string;
  type: 'group' | 'direct' | 'announcement';
  is_private: boolean;
  unread_count?: number;
  last_message?: ChatMessage;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  channel_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  file_url?: string;
  reply_to?: string;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
}

export interface EquityDistribution {
  category: string;
  percentage: number;
  color: string;
}

export interface BudgetItem {
  category: string;
  amount_millions: number;
  percentage: number;
  detail: string;
}
