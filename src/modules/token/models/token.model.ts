import { FeaturedTokensResponse,FeaturedToken, FeaturedTokenDTO } from "../../home/models/featured-token";
export class Token {
    basicInfo?: Partial<FeaturedTokenDTO>;

    constructor(tokenResponse?: FeaturedTokensResponse | null, featuredToken?: FeaturedTokenDTO, isUpcoming?: boolean) {
        if (tokenResponse) {
            const hasAudit = tokenResponse?.content?.Items.some(item => {
                return item.OtherCompanyAudit !== undefined
            })

            const otherAudit: FeaturedTokenDTO | undefined = tokenResponse?.content?.Items.filter(item => {
                return item.OtherCompanyAudit !== undefined
            })[0]

            this.basicInfo = (hasAudit && tokenResponse?.content?.Items[0].royalProofAudit === undefined) ? otherAudit : tokenResponse?.content?.Items[0];

            if (isUpcoming) {
                this.basicInfo = {
                    socialLinks: featuredToken?.socialLinks,
                    presaleInfo: featuredToken?.presaleInfo as any,
                    address: featuredToken?.address,
                    description: featuredToken?.description,
                    logo: featuredToken?.logo,
                    deployedDate: featuredToken?.deployedDate,
                    currency: {
                        decimals: featuredToken?.currency?.decimals as string,
                        name: featuredToken?.currency?.name as string,
                        symbol: featuredToken?.currency?.symbol as string,
                        tokenType: featuredToken?.currency?.tokenType as string
                    },
                    OtherCompanyAudit: featuredToken?.OtherCompanyAudit,
                    royalProofAudit: featuredToken?.royalProofAudit,
                }
            }
        }
    }

    convertFrom(featuredToken: FeaturedToken) {
        this.basicInfo = {
            kyc: featuredToken.kyc,
            socialLinks: featuredToken.socialLinks,
            trustLevel: featuredToken.trustLevel,
            presaleInfo: featuredToken.presaleInfo,
            address: featuredToken.address,
            logo: featuredToken.logoPicture,
            votes: featuredToken.votes,
            description: featuredToken.description,
            scamReason: featuredToken.scamReason,
            deployedDate: featuredToken.deployedDate,
            scamReasonTooltip: featuredToken.scamReasonTooltip,
            tag: featuredToken.tag,
            releaseDate: featuredToken.releaseDate,
            scamDate: featuredToken.scamDate,
            AMADate: featuredToken.AMADate,
            AMALink: featuredToken.AMALink,
            savingTime: featuredToken.savingTime,
            status: featuredToken.status,
            approvalStatus: featuredToken.approvalStatus,
            royalProofAudit: featuredToken.royalProofAudit,
            OtherCompanyAudit: featuredToken.OtherCompanyAudit,
            currency: featuredToken.currency,
            isVerified: featuredToken.isVerified,
        }  
    }
}

