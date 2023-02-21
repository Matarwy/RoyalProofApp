/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FeaturedToken, FeaturedTokensResponse } from '../../../modules/home/models/featured-token';

export const HomeContext = React.createContext({});

export const HomeProvider = (props: any) => {
    const [allTokens, setAllTokens] = useState<FeaturedToken[]>([]);

    const [featuredTokens, setFeaturedTokens] = useState<FeaturedToken[]>();
    const [recentlyAdded, setRecentlyAdded] = useState<FeaturedToken[]>();
    const [latestScams, setLatestScams] = useState<FeaturedToken[]>();
    const [potentialScams, setPotentialScams] = useState<FeaturedToken[]>();
    const [amaTokens, setAmaTokens] = useState<FeaturedToken[]>();

    const [featuredTokensPage, setFeaturedTokensPage] = useState<number>(1);
    const [recentlyAddedPage, setRecentlyAddedPage] = useState<number>(1);
    const [latestScamsPage, setLatestScamsPage] = useState<number>(1);
    const [potentialScamsPage, setPotentialScamsPage] = useState<number>(1);
    const [amaTokensPage, setAmaTokensPage] = useState<number>(1);

    const [featuredTokensFilter, setFeaturedTokensFilter] = useState<string>('all');
    const [amaTokensFilter, setAmaTokensFilter] = useState<boolean>(false);
    const [upcomingTokensFilter, setUpcomingTokensFilter] = useState<boolean>(false);


    const state = {
        allTokensState: { allTokens },
        featuredTokensState: [featuredTokens, setFeaturedTokens],
        recentlyAddedState: [recentlyAdded, setRecentlyAdded],
        amaTokensState: [amaTokens, setAmaTokens],
        latestScamsState: [latestScams, setLatestScams],
        potentialScamsState: [potentialScams, setPotentialScams],
        featuredTokensPageState: [featuredTokensPage, setFeaturedTokensPage],
        recentlyAddedPageState: [recentlyAddedPage, setRecentlyAddedPage],
        latestScamsPageState: [latestScamsPage, setLatestScamsPage],
        potentialScamsPageState: [potentialScamsPage, setPotentialScamsPage],
        amaTokensPageState: [amaTokensPage, setAmaTokensPage],
        featuredTokensFilterState: [featuredTokensFilter, setFeaturedTokensFilter],
        featuredUpcomingFilterState: [upcomingTokensFilter, setUpcomingTokensFilter],
        AmaTokensFilterState: [amaTokensFilter, setAmaTokensFilter]

    }

    useEffect(() => {
        fetchCacheID()
            .then(res => {
                const cacheid = res.data.customID;
                const currentCacheId = sessionStorage.getItem('cacheid')
                // if (Number(currentCacheId) !== Number(cacheid)) {
                if (currentCacheId !== cacheid) {
                    sessionStorage.setItem('cacheid', cacheid);
                    fetchFeaturedTokens();
                    fetchRecentlyAdded();
                    fetchLatestScams();
                    fetchPotentialScams();
                    fetchAmaAdded();
                } else {
                    const potentialScams = JSON.parse(sessionStorage.getItem('potentialScams') as string);
                    const featuredTokens = JSON.parse(sessionStorage.getItem('featuredTokens') as string);
                    const latestScams = JSON.parse(sessionStorage.getItem('latestScams') as string);
                    const amaTokens = JSON.parse(sessionStorage.getItem('amaTokens') as string);
                    const recentlyAdded = JSON.parse(sessionStorage.getItem('recentlyAdded') as string);
                    setPotentialScams(potentialScams);
                    setFeaturedTokens(featuredTokens);
                    setLatestScams(latestScams);
                    setAmaTokens(amaTokens);
                    setRecentlyAdded(recentlyAdded);
                }
            })

    }, []);

    const fetchCacheID = () => axios.get('https://api.royalproof.net/network/force_update')

    const fetchFeaturedTokens = () => {
        axios.get('https://api.royalproof.net/network/trusted').then(
            ({ data }) => {
                const featuredTokensResponse: FeaturedTokensResponse = data;
                const featuredTokens = featuredTokensResponse?.content?.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setFeaturedTokens(featuredTokens)
                setAllTokens([...allTokens, ...featuredTokens])
                persistToken('featuredTokens', featuredTokens);
            }

        )
    }

    const fetchRecentlyAdded = () => {
        axios.get('https://api.royalproof.net/network/upcomings').then(
            ({ data }) => {
                const recentlyAddedResponse: FeaturedTokensResponse = data;
                console.log("no error top");
                const recentlyAdded = recentlyAddedResponse?.content?.Items.map(
                    
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                console.log("no error bottom");
                setRecentlyAdded(recentlyAdded)
                setAllTokens([...allTokens, ...recentlyAdded])
                persistToken('recentlyAdded', recentlyAdded);

            }

        )
    }


    const fetchAmaAdded = () => {
        axios.get('https://api.royalproof.net/network/amas').then(
            ({ data }) => {
                const amaTokensResponse: FeaturedTokensResponse = data;
                const amaTokens = amaTokensResponse?.content?.Items.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setAmaTokens(amaTokens)
                setAllTokens([...allTokens, ...amaTokens])
                persistToken('amaTokens', amaTokens);

            }

        )

    }


    const fetchLatestScams = () => {
        axios.get('https://api.royalproof.net/network/scam').then(
            ({ data }) => {
                const latestScamsResponse: FeaturedTokensResponse = data;
                const latestScams = latestScamsResponse?.content?.Items?.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setLatestScams(latestScams)
                setAllTokens([...allTokens, ...latestScams])
                persistToken('latestScams', latestScams);

            }

        )

    }


    const fetchPotentialScams = () => {
        axios.get('https://api.royalproof.net/network/not_audited').then(
            ({ data }) => {
                const potentialScamsResponse: FeaturedTokensResponse = data;
                const potentialScams = potentialScamsResponse?.content?.Items?.map(
                    tokenResponse => new FeaturedToken(tokenResponse)
                )
                setPotentialScams(potentialScams)
                persistToken('potentialScams', potentialScams);
            }

        )

    }

    const persistToken = (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    return (
        <HomeContext.Provider value={state}>
            {props.children}
        </HomeContext.Provider >
    )

}
