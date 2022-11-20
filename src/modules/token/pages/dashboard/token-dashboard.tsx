/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {  Card, Descriptions, Spin, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import TokenInfoHighlight from '../../components/token-info-highlight/token-info-highlight';
import TokenMainCardComponent from '../../components/token-main-card/token-main-card';
import { Container, MainContent, MainSection } from './token-dashboard.style';


import {  LaptopOutlined } from '@ant-design/icons'
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';

import { format, isValid, parseISO } from 'date-fns';
import {  useParams } from 'react-router-dom';
import { differenceInDays } from 'date-fns/esm';
import { FaCopy } from 'react-icons/fa';
import ClipboardJS from 'clipboard';
import { AiFillCheckCircle } from 'react-icons/ai';

export const TokenDashboardComponent: React.FC = () => {
    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData, setTokenData] = ctx as [tokenData: Token, setTokenData: any];
    const [tokenAddress, setTokenAddress]: any = useState();
    const [loadingState, setLoadingState]: any = useState<boolean>();
    const [copyConfirm, setCopyConfirm]: any = useState<boolean>(false);
    let { tokenid } = useParams();


    useEffect(() => {
        new ClipboardJS('.copybutton');
        setLoadingState(true);
        setTokenAddress(tokenid);
        setTokenData(null)
        try {

            const persistedPotentialScams = JSON.parse(localStorage.getItem('potentialScams') as string);
            const persistedLatestScams = JSON.parse(localStorage.getItem('latestScams') as string);
            const persistedFeaturedTokens = JSON.parse(localStorage.getItem('featuredTokens') as string);
            const persistedAmaTokens = JSON.parse(localStorage.getItem('amaTokens') as string);
            const persistedRecentlyAddedTokens = JSON.parse(localStorage.getItem('recentlyAdded') as string);
            const allTokens = [
                ...persistedPotentialScams, ...persistedLatestScams, ...persistedFeaturedTokens, ...persistedAmaTokens,
                ...persistedRecentlyAddedTokens
            ]
            const token = allTokens.find(persisted => persisted.address === tokenid);
            if (token) {
                const tokenobj = new Token();
                tokenobj.convertFrom(token)
                setTokenData(tokenobj)
                if (tokenobj.basicInfo !== undefined) {

                }
            }
        } catch(e){
            console.log(e);
        }

    }, [tokenid])

    const getDate = (rdate: string) => {
        const date = parseISO(rdate);
        if (date && isValid(date)) {
            return format(date, 'PP').toString();
        } else {
            return '';
        }
    }
    return <Container>
        <MainSection>
            <TokenMainCardComponent
                loading={tokenData?.basicInfo === undefined && <div className='loading'> <Spin /></div>}
            />
            {
                tokenData?.basicInfo?.royalProofAudit !== undefined &&
                <Card title={`Trust ${tokenData?.basicInfo?.trustLevel} Award`}>
                    {
                        loadingState && <Spin />
                    }
                    {
                        !loadingState && <div>
                            <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                <Descriptions.Item labelStyle={{ width: 'fit-content !important' }} label="Company">{'RoyalProof'}</Descriptions.Item>
                            </Descriptions>
                            <div className="audit-link">
                                <LaptopOutlined color='#b5b5c3'
                                ></LaptopOutlined>
                                <a style={{ fontSize: '14px' }} target="__blank"
                                    className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                                    href={tokenData?.basicInfo?.royalProofAudit.certificateOfTrustURL}>{tokenData?.basicInfo?.tag?.toLowerCase() === 'verified' ? 'Audit Link' : '"Certificate of Trust"'} Link</a></div>
                            <div className="audit-gif">
                                <img
                                    width="100%"
                                    height="100%"
                                    src={tokenData?.basicInfo?.royalProofAudit.certificateOfTrustGif} alt=" "
                                />
                            </div>
                        </div>
                    }
                </Card>
            }
            {
                (tokenData?.basicInfo?.OtherCompanyAudit !== undefined) &&
                <Card title="Audit Information">
                    <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item labelStyle={{ width: 'fit-content !important' }} label="Company">{(tokenData?.basicInfo?.OtherCompanyAudit as any).companyName}</Descriptions.Item>
                    </Descriptions>
                    <div className="audit-link">
                        <LaptopOutlined color='#b5b5c3'
                        ></LaptopOutlined>
                        <a style={{ fontSize: '14px' }} target="__blank"
                            className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                            href={(tokenData?.basicInfo?.OtherCompanyAudit as any).auditLink}>Audit Link</a>
                    </div>

                </Card>
            }
            {
                tokenData?.basicInfo?.royalProofAudit === undefined && (tokenData?.basicInfo?.OtherCompanyAudit === undefined) &&
                <Card title='Audit Information'>
                    <span className="text-gray-800 fw-bold mb-5 fs-6">
                        Audits provide more security to potential investors. If you need an audit for your project, contact <a href="mailto:support@royalproof.net" style={{ color: '#AADADF ' }}>RoyalProof</a>
                    </span>
                </Card>
            }
            {
                loadingState &&
                <Card >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Spin />
                    </div>
                </Card>
            }


        </MainSection>

        <MainContent>
            <Card style={{ width: '100%', minHeight: '115px' }}>
                <TokenInfoHighlight loading={loadingState} ></TokenInfoHighlight>

            </Card>

            <Card style={{ width: '100%' }}>

                <div>
                    {
                        tokenData?.basicInfo?.scamReasonTooltip &&
                        <div>
                            <h3 style={{ fontWeight: 600, marginTop: '-10px', display: 'flex', alignItems: 'center' }}>Scam Summary <span style={{ marginLeft: '10px' }}><Tag color="red">{tokenData?.basicInfo?.scamReason && tokenData?.basicInfo?.scamReason[0]}</Tag></span></h3>
                            <p style={{ color: 'rgb(248, 54, 71)' }}>
                                {
                                    tokenData?.basicInfo?.scamReasonTooltip
                                }
                            </p>
                        </div>
                    }
                    <h3 style={{ fontWeight: 600 }}>About</h3>
                    <p className='text-gray-800 fw-normal mb-5 fs-6' >{(tokenData as Token)?.basicInfo?.description ? (tokenData as Token)?.basicInfo?.description : <span>Are you the project owner? Please <a className="text-hover-primary" href="https://t.me/ICOLiveAdmin">click here</a> to add all the missing information about your project!</span>}</p>
                    <h1 >Contract Address</h1>
                    {tokenAddress && <span className='contact-address'>{tokenAddress}
                        <span className="copybutton" style={{ marginLeft: '10px' }} onClick={() => {
                            navigator.clipboard.writeText(tokenAddress);
                            setCopyConfirm(true)
                            setTimeout(() => setCopyConfirm(false), 1000)
                        }} >
                            {!copyConfirm && <FaCopy color="#181c32"></FaCopy>}
                            {copyConfirm && <AiFillCheckCircle color="#181c32"></AiFillCheckCircle>}
                        </span>
                    </span>}
                    {
                        !tokenData?.basicInfo?.currency && <div style={{ padding: '30px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Spin />
                        </div>
                    }
                    {
                        tokenData?.basicInfo?.currency && <div className="descriptions-wrapper">
                            <Descriptions size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                <Descriptions.Item label="Name">
                                    {tokenData?.basicInfo?.currency?.name ? tokenData?.basicInfo?.currency?.name : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Symbol">
                                    {tokenData?.basicInfo?.currency?.symbol ? tokenData?.basicInfo?.currency?.symbol : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Decimals">
                                    {tokenData?.basicInfo?.currency?.decimals ? tokenData?.basicInfo?.currency?.decimals : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Type">
                                    {tokenData?.basicInfo?.currency?.tokenType ? tokenData?.basicInfo?.currency?.tokenType : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    {tokenData?.basicInfo?.releaseDate ? differenceInDays(
                                        new Date(tokenData?.basicInfo?.releaseDate as string),
                                        new Date()
                                    ) >= 0 ? 'NOT LAUNCHED' : 'LAUNCHED' : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Release Date">{
                                    (tokenData as Token)?.basicInfo?.releaseDate ? getDate(tokenData?.basicInfo?.releaseDate as string) : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Is Contract Verified?">
                                    {tokenData ? tokenData?.basicInfo?.isVerified ? 'Yes' : 'No' : '-'}
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                            {
                                tokenData?.basicInfo?.presaleInfo &&
                                <Descriptions.Item >
                                    <Card className='presale-card' title="Presale Info">
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="Start Date">
                                                {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.presaleDate ? getDate(tokenData?.basicInfo?.presaleInfo?.presaleDate) : '-' : '-'}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Soft Cap">
                                                {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.softcap ? tokenData?.basicInfo?.presaleInfo?.softcap : '-' : '-'}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Hard Cap">
                                                {tokenData?.basicInfo ? tokenData?.basicInfo?.presaleInfo?.hardcap ? tokenData?.basicInfo?.presaleInfo?.hardcap : '-' : '-'}
                                            </Descriptions.Item>
                                            <span><a className="fs-7 fw-bold d-block lh-1 pt-2" href={tokenData?.basicInfo?.presaleInfo?.presaleLink} rel="noopener noreferrer" target={'__bank'}>Presale Link</a></span>
                                        </Descriptions>
                                    </Card>
                                </Descriptions.Item>
                            }
                            </Descriptions>
                        </div>
                    }
                </div>
            </Card>
        </MainContent>
    </Container >
};
