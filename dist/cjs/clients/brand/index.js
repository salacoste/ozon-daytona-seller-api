"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandAPI = void 0;
class BrandAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listBrandCertifications(params) {
        return this.httpClient.post('/v1/brand/company-certification/list', params);
    }
    async *iterateBrandCertifications(params) {
        let page = 1;
        let hasNext = true;
        while (hasNext) {
            const response = await this.listBrandCertifications({
                ...params,
                page
            });
            const certifications = response.data.result?.brand_certification || [];
            if (certifications.length === 0) {
                hasNext = false;
            }
            else {
                yield certifications;
                hasNext = certifications.length === params.page_size;
                page++;
            }
        }
    }
    async getCertificationSummary() {
        const allBrands = [];
        for await (const brandsPage of this.iterateBrandCertifications({
            page_size: 100
        })) {
            allBrands.push(...brandsPage);
        }
        const requiresCertification = allBrands.filter(brand => brand.has_certificate);
        const compliant = allBrands.filter(brand => !brand.has_certificate);
        const totalBrands = allBrands.length;
        const complianceRate = totalBrands > 0 ? (compliant.length / totalBrands) * 100 : 100;
        let riskLevel;
        if (complianceRate >= 95)
            riskLevel = 'low';
        else if (complianceRate >= 85)
            riskLevel = 'medium';
        else if (complianceRate >= 70)
            riskLevel = 'high';
        else
            riskLevel = 'critical';
        const recommendations = [];
        if (requiresCertification.length > 0) {
            recommendations.push(`Obtain certificates for ${requiresCertification.length} brand(s) immediately`);
            recommendations.push('Set up document tracking system for certificate renewals');
        }
        if (complianceRate < 100) {
            recommendations.push('Implement regular compliance monitoring schedule');
            recommendations.push('Create brand certification checklist for new products');
        }
        if (totalBrands > 10) {
            recommendations.push('Consider using compliance management software');
        }
        if (riskLevel === 'critical') {
            recommendations.push('⚠️  CRITICAL: Address certification gaps to avoid sales disruption');
        }
        recommendations.push('Monitor for changes in brand certification requirements');
        recommendations.push('Maintain direct communication channels with brand representatives');
        return {
            totalBrands,
            complianceRate,
            requiresCertification: {
                count: requiresCertification.length,
                brands: requiresCertification
            },
            compliant: {
                count: compliant.length,
                brands: compliant
            },
            riskLevel,
            recommendations
        };
    }
    async checkBrandCertifications(brandNames) {
        const allBrands = [];
        for await (const brandsPage of this.iterateBrandCertifications({
            page_size: 100
        })) {
            allBrands.push(...brandsPage);
        }
        const brandMap = new Map();
        allBrands.forEach(brand => {
            if (brand.brand_name) {
                brandMap.set(brand.brand_name.toLowerCase(), brand);
            }
        });
        return brandNames.map(brandName => {
            const lowerBrandName = brandName.toLowerCase();
            const brand = brandMap.get(lowerBrandName);
            return {
                brandName,
                found: !!brand,
                ...(brand && { brand }),
                requiresCertification: brand?.has_certificate || false
            };
        });
    }
}
exports.BrandAPI = BrandAPI;
