import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, changeMessage, changeType, removeActivity } from '../../store/slices/activityLogSlice';
import store from '../../store';
import { State, ActivityType } from '../../types/ActivityLogEntry'; // Import types
import { currentContact, currentUser } from '../../constants';

const useActivityLog = () => {
    const dispatch = useDispatch();
    const activityLogs = useSelector((state: State) => state.activityLogs);
    const currentActivityLog = useSelector((state: State) => state.currentActivityLog);

    useEffect(() => {
        const saveState = (state: State) => {
            try {
                const serializedState = JSON.stringify(state);
                localStorage.setItem('state', serializedState);
            } catch (err) {
                console.error(err);
            }
        };

        const unsubscribe = store.subscribe(() => {
            saveState(store.getState());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const actionOptions = [{
        text: 'Delete',
        handler: (id: number) => {
            dispatch(removeActivity(id));
        },
    }];

    const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMessage({ message: e.target.value }));
    }, [dispatch]);

    const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeType({ type: e.target.value as ActivityType }));
    }, [dispatch]);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(addActivity({
            ...currentActivityLog,
            currentUser,
            contact: currentContact,
            id: new Date().getSeconds(),
            date: new Date().getTime().toString(),
        }));
    }, [currentActivityLog, dispatch]);

    const isMessageFieldActive = (): boolean => {
        return currentActivityLog?.message?.length > 0;
    };

    return {
        activityLogs,
        currentUser,
        currentActivityLog,
        actionOptions,
        handleMessageChange,
        handleTypeChange,
        handleSubmit,
        isMessageFieldActive
    };
};

export default useActivityLog;
