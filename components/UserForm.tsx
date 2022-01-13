import React, { FC, useState, useEffect } from 'react';

import { StatesData, SelectAPIResponse, UserAPIPostData } from '../models';

import Spinner from '../components/Spinner';
import UserSuccess from '../components/UserSuccess';

import 'regenerator-runtime';

const UserForm: FC<{
    className?: string;
}> = ({ className }) => {
    const [occupations, setOccupations] = useState<string[]>([]);
    const [states, setStates] = useState<StatesData[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userOccupation, setUserOccupation] = useState<string>('');
    const [userState, setUserState] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const userData = {
        ...(userName && { name: userName }),
        ...(userEmail && { email: userEmail }),
        ...(userPassword && { password: userPassword }),
        ...(userOccupation && { occupation: userOccupation }),
        ...(userState && { state: userState }),
    };

    useEffect(() => {
        void getSelectData();
    }, []);

    async function getSelectData() {
        const res = await fetch('https://frontend-take-home.fetchrewards.com/form');
        const json: SelectAPIResponse = await res.json();

        setOccupations(json.occupations);
        setStates(json.states);
    }

    async function addUser() {
        try {
            if (!isUserData(userData as UserAPIPostData)) throw new Error('Invalid User Submission!');

            const res = await fetch('https://frontend-take-home.fetchrewards.com/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (res.ok && res.status === 200) {
                setSuccess(true);
            } else {
                throw new Error('Unknown User Submission Error!');
            }
       } catch(err) {
           console.error(err);
       }
       setIsSubmitting(false);
    }

    return (
        <div className={className}>

            <h3 className="text-2xl mb-2">
                {success ? 'User Added!' : 'Add a User' }
            </h3>

            {success ? 
                <UserSuccess 
                    className="bg-green-200 p-5 rounded-xl"

                    user={userData as UserAPIPostData} 
                    resetHandler={() => reset()} 
                />
            : (
                <form
                    className="bg-blue-100 border border-gray-400 rounded-xl p-3 md:p-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsSubmitting(true);
                        void addUser();
                    }}
                >
                    <label className="form-block" htmlFor="full_name">
                        <div className="form-label">Full Name</div>
                        <input
                            id="full_name"
                            className="form-input"
                            data-testid="input-name"
                            type="text"
                            placeholder="John Doe"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>

                    <label className="form-block" htmlFor="email">
                        <div className="form-label">Email</div>
                        <input
                            id="email"
                            className="form-input"
                            data-testid="input-email"
                            type="email"
                            placeholder="name@domain.com"
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>

                    <label className="form-block" htmlFor="password">
                        <div className="form-label">Password</div>
                        <input
                            id="password"
                            className="form-input"
                            data-testid="input-pass"
                            type="password"
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </label>

                    <label className="form-block" htmlFor="occupation">
                        <div className="form-label">Occupation</div>
                        <select 
                            id="occupation" 
                            className="form-input"
                            data-testid="select-occupation"
                            disabled={occupations.length === 0}
                            onChange={(e) => setUserOccupation(e.target.value)}
                            onBlur={(e) => setUserOccupation(e.target.value)}
                        >
                            <option />
                            {occupations.map((occ) => (
                                <option key={occ} value={occ}>
                                    {occ}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="form-block" htmlFor="state">
                        <div className="form-label">State</div>
                        <select 
                            id="state" 
                            className="form-input"
                            data-testid="select-state"
                            disabled={states.length === 0}
                            onChange={(e) => setUserState(e.target.value)}
                            onBlur={(e) => setUserState(e.target.value)}
                        >
                            <option />
                            {states.map((st) => (
                                <option key={st.abbreviation} value={st.abbreviation}>
                                    {st.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    
                    <button 
                        className="px-10 py-2 mt-4 bg-blue-900 text-white rounded hover:bg-blue-600 w-full md:w-4/5 disabled:opacity-25"
                        data-testid="submit-btn"
                        disabled={!isUserData(userData as UserAPIPostData)} 
                    >
                        {isSubmitting ? <Spinner /> : 'Add User'}
                    </button>
                </form>
            )}
        </div>
    );

    function isUserData(data: UserAPIPostData): boolean {
        const expectedKeys = ['name', 'email', 'password', 'occupation', 'state'];
        return expectedKeys.every(k => Object.keys(data).includes(k));
    }

    function reset() {
        setSuccess(false);
        setUserName('');
        setUserEmail('');
        setUserOccupation('');
        setUserPassword('');
        setUserState('');
    }
}

export default UserForm;