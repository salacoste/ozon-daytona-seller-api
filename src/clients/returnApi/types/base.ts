/**
 * ReturnAPI base types
 */

/**
 * Drop-off point information
 */
export interface DropOffPoint {
  /** Drop-off point address */
  address?: string;
  /** Number of boxes at drop-off point */
  box_count?: number;
  /** Drop-off point identifier */
  id?: number;
  /** Drop-off point name */
  name?: string;
  /** Pass information */
  pass_info?: PassInfo;
  /** Warehouse ID where shipment will arrive */
  place_id?: number;
  /** Number of returns at drop-off point */
  returns_count?: number;
  /** UTC offset */
  utc_offset?: string;
}

/**
 * Pass information for drop-off points
 */
export interface PassInfo {
  /** Whether pass is required */
  is_required?: boolean;
  /** Pass information details */
  pass_info?: string;
}

/**
 * Return giveout information
 */
export interface ReturnGiveout {
  /** Giveout identifier */
  id?: number;
  /** Giveout status */
  status?: string;
  /** Creation date */
  created_at?: string;
  /** Update date */
  updated_at?: string;
  /** Returns count in giveout */
  returns_count?: number;
  /** Boxes count in giveout */
  boxes_count?: number;
}

/**
 * File content response
 */
export interface FileContent {
  /** Content type */
  content_type?: string;
  /** File name */
  file_name?: string;
  /** Base64 encoded file content */
  file_content?: string;
}