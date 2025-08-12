import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV3ImportProductsRequest, IV3ImportProductsResponse, IProductGetImportProductsInfoRequest, IProductGetImportProductsInfoResponse, IProductImportProductsBySKURequest, IProductImportProductsBySKUResponse, IV1ProductUpdateAttributesRequest, IV1ProductUpdateAttributesResponse, IProductv1ProductImportPicturesRequest, IProductv1ProductInfoPicturesResponse, IProductv3GetProductListRequest, IProductv3GetProductListResponse, IV3GetProductInfoListRequest, IV3GetProductInfoListResponse, IProductv4GetProductAttributesV4Request, IV4GetProductAttributesResponsePdf, IV4GetUploadQuotaResponse, IProductProductArchiveRequest, IProductProductUnarchiveRequest, IProductGetProductInfoDescriptionRequest, IProductGetProductInfoDescriptionResponse, IV1ProductUpdateOfferIdRequest, IV1ProductUpdateOfferIdResponse } from '../../types/generated/productapi';
export declare class ProductAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    importV3(params: IV3ImportProductsRequest): Promise<IHttpResponse<IV3ImportProductsResponse>>;
    getImportInfo(params: IProductGetImportProductsInfoRequest): Promise<IHttpResponse<IProductGetImportProductsInfoResponse>>;
    importBySku(params: IProductImportProductsBySKURequest): Promise<IHttpResponse<IProductImportProductsBySKUResponse>>;
    updateAttributes(params: IV1ProductUpdateAttributesRequest): Promise<IHttpResponse<IV1ProductUpdateAttributesResponse>>;
    importPictures(params: IProductv1ProductImportPicturesRequest): Promise<IHttpResponse<IProductv1ProductInfoPicturesResponse>>;
    getList(params: IProductv3GetProductListRequest): Promise<IHttpResponse<IProductv3GetProductListResponse>>;
    getInfoList(params: IV3GetProductInfoListRequest): Promise<IHttpResponse<IV3GetProductInfoListResponse>>;
    getAttributesV4(params: IProductv4GetProductAttributesV4Request): Promise<IHttpResponse<IV4GetProductAttributesResponsePdf>>;
    getUploadQuota(): Promise<IHttpResponse<IV4GetUploadQuotaResponse>>;
    archive(params: IProductProductArchiveRequest): Promise<IHttpResponse<any>>;
    unarchive(params: IProductProductUnarchiveRequest): Promise<IHttpResponse<any>>;
    getProductDescription(params: IProductGetProductInfoDescriptionRequest): Promise<IHttpResponse<IProductGetProductInfoDescriptionResponse>>;
    updateOfferId(params: IV1ProductUpdateOfferIdRequest): Promise<IHttpResponse<IV1ProductUpdateOfferIdResponse>>;
    getProductListV3(params: IProductv3GetProductListRequest): Promise<IHttpResponse<IProductv3GetProductListResponse>>;
    getProductInfoListV3(params: IV3GetProductInfoListRequest): Promise<IHttpResponse<IV3GetProductInfoListResponse>>;
    getProductAttributesV4(params: IProductv4GetProductAttributesV4Request): Promise<IHttpResponse<IV4GetProductAttributesResponsePdf>>;
    iterateProductListV3(params: IProductv3GetProductListRequest, config?: {
        maxPages?: number;
        delayBetweenPages?: number;
    }): AsyncGenerator<{
        value: IHttpResponse<IProductv3GetProductListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    getProductDescriptionV1(params: IProductGetProductInfoDescriptionRequest): Promise<IHttpResponse<IProductGetProductInfoDescriptionResponse>>;
    getUploadQuotaV4(): Promise<IHttpResponse<IV4GetUploadQuotaResponse>>;
    updateOfferIdV1(params: IV1ProductUpdateOfferIdRequest): Promise<IHttpResponse<IV1ProductUpdateOfferIdResponse>>;
    archiveV1(params: IProductProductArchiveRequest): Promise<IHttpResponse<any>>;
    unarchiveV1(params: IProductProductUnarchiveRequest): Promise<IHttpResponse<any>>;
}
