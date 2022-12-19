import { format, isValid, parseISO } from "date-fns";

export interface Currency {
    symbol: string;
    name: string;
    decimals: string;
    tokenType: string;
}

export interface Socials {
    telegram: string;
    twitter: string;
    website: string;
    discord: string;
}

export interface Category {
    isScam: boolean;
    isPotencialScam: boolean;
    isRecentlyAdded: boolean;
    isFeature: boolean;
    isAma: boolean;
    isAudit: boolean;
}

export interface RoyalProofAudit {
    certificateOfTrustURL: string;
    certificateOfTrustGif: string;
}

export interface OtherCompanyAuditModel {
    auditLink: string;
    companyName: string;
}
export interface PresaleInfo {
    link?: string;
    releaseDate?: string;
    hardcap?: string;
    presaleDate?: string;
    presaleLink?: string;
    softcap?: string;
}
export interface FeaturedTokenDTO {
    category: Category;
    socialLinks: Socials;
    trustLevel: string;
    presaleInfo: PresaleInfo;
    address: string;
    logo: string;
    votes: number;
    description: string;
    scamReason: string[];
    deployedDate?: string;
    scamReasonTooltip?: string;
    tag: string;
    releaseDate?: string;
    scamDate?: string;
    AMADate?: any;
    AMALink?: string;
    savingTime?: string;
    status: string;
    approvalStatus: string;
    royalProofAudit: RoyalProofAudit;
    OtherCompanyAudit?: OtherCompanyAuditModel;
    currency: Currency;
    isVerified: boolean;
    kyc:boolean;
}

export interface Content {
    Items: FeaturedTokenDTO[];
    Count: number;
    ScannedCount: number;
}

export interface FeaturedTokensResponse {
    statusCode: string;
    content: Content;
}

export class FeaturedToken {
    kyc: boolean;
    socialLinks: Socials;
    trustLevel: string;
    presaleInfo: PresaleInfo;
    address: string;
    logoPicture: string;
    votes: number;
    description: string;
    scamReason: string[];
    deployedDate?: string;
    scamReasonTooltip?: string;
    tag: any;
    releaseDate?: string;
    scamDate?: string;
    AMADate?: any;
    AMALink?: string;
    savingTime?: string;
    status: string;
    approvalStatus: string;
    royalProofAudit: RoyalProofAudit;
    OtherCompanyAudit?: OtherCompanyAuditModel;
    currency: Currency;
    isVerified: boolean;

    constructor(featuredTokenDTO: FeaturedTokenDTO) {
        this.currency = featuredTokenDTO.currency;
        this.socialLinks = featuredTokenDTO.socialLinks;
        this.kyc = featuredTokenDTO.kyc;
        this.isVerified = featuredTokenDTO.isVerified;
        this.logoPicture = featuredTokenDTO?.logo;
        this.presaleInfo = featuredTokenDTO?.presaleInfo;
        this.approvalStatus = featuredTokenDTO?.approvalStatus;
        this.votes = featuredTokenDTO?.votes;
        this.status = featuredTokenDTO?.status;
        this.description = featuredTokenDTO?.description;
        this.royalProofAudit = featuredTokenDTO?.royalProofAudit;
        this.OtherCompanyAudit = featuredTokenDTO?.OtherCompanyAudit;
        this.trustLevel = featuredTokenDTO?.trustLevel;
        this.address = featuredTokenDTO?.address;
        this.scamReason = featuredTokenDTO?.scamReason;
        this.socialLinks = featuredTokenDTO?.socialLinks;
        this.scamReasonTooltip = featuredTokenDTO.scamReasonTooltip;
        this.scamDate = featuredTokenDTO?.scamDate ? featuredTokenDTO?.scamDate : '';

        const date = parseISO(featuredTokenDTO?.releaseDate as string);
        if (date && isValid(date)) {
            this.releaseDate = format(date, 'PP').toString();
        } else {
            this.releaseDate = '';
        }

        if (featuredTokenDTO.presaleInfo && featuredTokenDTO.presaleInfo.presaleDate) {
            const presaledate = parseISO(featuredTokenDTO?.presaleInfo.presaleDate as string);
            if (date && isValid(presaledate)) {
                this.presaleInfo.presaleDate = format(presaledate, 'PP').toString();
            } else {
                this.presaleInfo.presaleDate = '';
            }
        }

        if (featuredTokenDTO.tag) {
            this.tag = featuredTokenDTO?.tag;
        }
        if (featuredTokenDTO.AMADate) {
            this.AMADate = featuredTokenDTO.AMADate;
        }

        if (featuredTokenDTO.savingTime) {
            this.savingTime = featuredTokenDTO.savingTime;
        }


        if (featuredTokenDTO.AMALink) {
            this.AMALink = featuredTokenDTO.AMALink;
        }
        

    }
}