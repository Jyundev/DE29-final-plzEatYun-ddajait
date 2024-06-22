// useStore.js
import { create } from "zustand";
import { AuthApi } from "./UserApi";
import axios from "axios";

export const userStore = create((set) => ({
    userInfo: null,
    challengeInfo: null,
    chlallengeList: null,
    joinChallengeData: null,
    fetchUserDataLoading: true,
    fetchChallengeDataLoading: true,
    fetchChalengeListLoading: true,
    fetchJoinChallengeDataLoading: true,
    
    fetchUserData: async () => {
        try {
            set({fetchUserDataLoading: false})
            const token = localStorage.getItem('token');
            const response = await AuthApi({token}).get('/api/v1/user/Auth');
            set({ userInfo: response.data, fetchUserDataLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ fetchUserDataLoading: false });
        }
    },
    fetchChallengeData: async({ challengeId, userId }) => {
        try {
            set({fetchChallengeDataLoading: true})
            const token = localStorage.getItem('token');
            const fetchData = await AuthApi({token}).get(`/api/v1/user/challenge/challengePage/${challengeId}/${userId}`);
            set({ challengeInfo: fetchData.data, fetchChallengeDataLoading: false })
        } catch (error) {
            console.log(error)
            set({ fetchChallengeDataLoading: false })
        }
    },
    fetchChallengeList: async() => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId')
            const fetchData = await AuthApi({token}).get(`/api/v1/user/challenge/${userId}`)
            set({chlallengeList: fetchData.data, fetchChalengeListLoading: false})
        } catch (error) {
            console.log(error);
            set({fetchChalengeListLoading: false})
        }
    },
    fetchJoinChallengeData: async(challengeId) => {
        try {
            const fetchData = await axios.get(`http://52.78.44.47/api/v1/challenge/detail/${challengeId}`);
            set({joinChallengeData: fetchData, fetchJoinChallengeDataLoading: false})
        } catch (error) {
            console.log(error)
        }
    },
    initUserData: () => {
        set({userInfo: null, challengeInfo: null})
    }
}));
