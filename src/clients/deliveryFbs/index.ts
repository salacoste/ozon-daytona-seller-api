/**
 * DeliveryFBS API client for Ozon Seller API
 * 
 * Implements FBS delivery and carriage management endpoints from /methods/04-deliveryfbs.json:
 * - Carriage (shipment) creation, approval, modification, and cancellation
 * - FBS act creation and document generation
 * - Available carriage listing and information retrieval
 * - Posting management and splitting
 * - Document generation (barcodes, PDFs, labels)
 */

import type { HttpClient } from '../../http/HttpClient';
import { DeliveryFbsCarriageManager } from './carriage';
import { DeliveryFbsActsManager } from './acts';
import { DeliveryFbsLabelsManager } from './labels';
import { DeliveryFbsPdfsManager } from './pdfs';

/**
 * DeliveryFBS API client for managing FBS deliveries, carriages, and shipment documents
 * 
 * Provides comprehensive FBS (Fulfillment by Seller) delivery management including:
 * - Carriage (shipment) lifecycle management
 * - Document generation and retrieval
 * - Posting management and optimization
 * - Integration with Ozon logistics systems
 * 
 * @example
 * ```typescript
 * // Create a new carriage for shipment
 * const carriage = await client.deliveryFbs.carriage.createCarriage({
 *   delivery_method_id: 123,
 *   departure_date: '2024-01-15T10:00:00Z'
 * });
 * 
 * // Approve the carriage
 * await client.deliveryFbs.carriage.approveCarriage({
 *   carriage_id: carriage.data.carriage?.carriage_id!
 * });
 * 
 * // Get available carriages for document generation
 * const availableCarriages = await client.deliveryFbs.acts.getAvailableCarriageList({
 *   date: {
 *     time_from: '2024-01-01T00:00:00Z',
 *     time_to: '2024-01-31T23:59:59Z'
 *   }
 * });
 * 
 * // Generate barcode for shipment
 * const barcode = await client.deliveryFbs.labels.getBarcode({ id: actId });
 * ```
 */
export class DeliveryFbsAPI {
  /** Carriage management operations */
  public readonly carriage: DeliveryFbsCarriageManager;
  
  /** FBS acts and document operations */
  public readonly acts: DeliveryFbsActsManager;
  
  /** Labels and barcode generation operations */
  public readonly labels: DeliveryFbsLabelsManager;
  
  /** PDF and document generation operations */
  public readonly pdfs: DeliveryFbsPdfsManager;

  constructor(httpClient: HttpClient) {
    this.carriage = new DeliveryFbsCarriageManager(httpClient);
    this.acts = new DeliveryFbsActsManager(httpClient);
    this.labels = new DeliveryFbsLabelsManager(httpClient);
    this.pdfs = new DeliveryFbsPdfsManager(httpClient);
  }

  // Legacy methods for backward compatibility - delegate to appropriate managers
  
  /** @deprecated Use carriage.createCarriage instead */
  async createCarriage(...args: Parameters<DeliveryFbsCarriageManager['createCarriage']>) {
    return this.carriage.createCarriage(...args);
  }

  /** @deprecated Use carriage.approveCarriage instead */
  async approveCarriage(...args: Parameters<DeliveryFbsCarriageManager['approveCarriage']>) {
    return this.carriage.approveCarriage(...args);
  }

  /** @deprecated Use carriage.setPostings instead */
  async setPostings(...args: Parameters<DeliveryFbsCarriageManager['setPostings']>) {
    return this.carriage.setPostings(...args);
  }

  /** @deprecated Use carriage.cancelCarriage instead */
  async cancelCarriage(...args: Parameters<DeliveryFbsCarriageManager['cancelCarriage']>) {
    return this.carriage.cancelCarriage(...args);
  }

  /** @deprecated Use carriage.getCarriageDeliveryList instead */
  async getCarriageDeliveryList(...args: Parameters<DeliveryFbsCarriageManager['getCarriageDeliveryList']>) {
    return this.carriage.getCarriageDeliveryList(...args);
  }

  /** @deprecated Use carriage.getCarriage instead */
  async getCarriage(...args: Parameters<DeliveryFbsCarriageManager['getCarriage']>) {
    return this.carriage.getCarriage(...args);
  }

  /** @deprecated Use acts.createFBSAct instead */
  async createFBSAct(...args: Parameters<DeliveryFbsActsManager['createFBSAct']>) {
    return this.acts.createFBSAct(...args);
  }

  /** @deprecated Use acts.getAvailableCarriageList instead */
  async getAvailableCarriageList(...args: Parameters<DeliveryFbsActsManager['getAvailableCarriageList']>) {
    return this.acts.getAvailableCarriageList(...args);
  }

  /** @deprecated Use acts.iterateAvailableCarriageList instead */
  async *iterateAvailableCarriageList(...args: Parameters<DeliveryFbsActsManager['iterateAvailableCarriageList']>) {
    yield* this.acts.iterateAvailableCarriageList(...args);
  }

  /** @deprecated Use acts.splitFBSPosting instead */
  async splitFBSPosting(...args: Parameters<DeliveryFbsActsManager['splitFBSPosting']>) {
    return this.acts.splitFBSPosting(...args);
  }

  /** @deprecated Use acts.getActPostingsList instead */
  async getActPostingsList(...args: Parameters<DeliveryFbsActsManager['getActPostingsList']>) {
    return this.acts.getActPostingsList(...args);
  }

  /** @deprecated Use labels.getContainerLabels instead */
  async getContainerLabels(...args: Parameters<DeliveryFbsLabelsManager['getContainerLabels']>) {
    return this.labels.getContainerLabels(...args);
  }

  /** @deprecated Use labels.getBarcode instead */
  async getBarcode(...args: Parameters<DeliveryFbsLabelsManager['getBarcode']>) {
    return this.labels.getBarcode(...args);
  }

  /** @deprecated Use labels.getBarcodeText instead */
  async getBarcodeText(...args: Parameters<DeliveryFbsLabelsManager['getBarcodeText']>) {
    return this.labels.getBarcodeText(...args);
  }

  /** @deprecated Use labels.checkDigitalActStatus instead */
  async checkDigitalActStatus(...args: Parameters<DeliveryFbsLabelsManager['checkDigitalActStatus']>) {
    return this.labels.checkDigitalActStatus(...args);
  }

  /** @deprecated Use pdfs.getActPDF instead */
  async getActPDF(...args: Parameters<DeliveryFbsPdfsManager['getActPDF']>) {
    return this.pdfs.getActPDF(...args);
  }

  /** @deprecated Use pdfs.getFBSActsList instead */
  async getFBSActsList(...args: Parameters<DeliveryFbsPdfsManager['getFBSActsList']>) {
    return this.pdfs.getFBSActsList(...args);
  }

  /** @deprecated Use pdfs.iterateFBSActsList instead */
  async *iterateFBSActsList(...args: Parameters<DeliveryFbsPdfsManager['iterateFBSActsList']>) {
    yield* this.pdfs.iterateFBSActsList(...args);
  }

  /** @deprecated Use pdfs.getDigitalActPDF instead */
  async getDigitalActPDF(...args: Parameters<DeliveryFbsPdfsManager['getDigitalActPDF']>) {
    return this.pdfs.getDigitalActPDF(...args);
  }

  /** @deprecated Use labels.checkActStatus instead */
  async checkActStatus(...args: Parameters<DeliveryFbsLabelsManager['checkActStatus']>) {
    return this.labels.checkActStatus(...args);
  }
}

// Re-export types for convenience
export type * from './types';