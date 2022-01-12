import { FC, useState, useEffect } from 'react';

import { StatesData, SelectAPIResponse } from '../models';

const UserForm: FC<{
    className?: string;
}> = ({ className }) => {
    const [occupations, setOccupations] = useState<string[]>([]);
    const [states, setStates] = useState<StatesData[]>([]);

    useEffect(() => {
        void getSelectData();
    }, []);

    async function getSelectData() {
        const res = await fetch('https://frontend-take-home.fetchrewards.com/form');
        const json: SelectAPIResponse = await res.json();

        setOccupations(json.occupations);
        setStates(json.states);
    }

    return (
        <div className="md:w-3/5 max-w-md">

            <h3 className="text-2xl mb-2">Add a User</h3>

            <form
                className="bg-gray-200 rounded-xl p-3"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('FORM SUBMIT!!!');
                }}
            >
                <label className="form-block" htmlFor="full_name">
                    <div className="form-label">Full Name</div>
                    <input
                        id="full_name"
                        className="form-input"
                        type="text"
                        placeholder="John Doe"
                    />
                </label>

                <label className="form-block" htmlFor="email">
                    <div className="form-label">Email</div>
                    <input
                        id="email"
                        className="form-input"
                        type="email"
                        placeholder="name@domain.com"
                    />
                </label>

                <label className="form-block" htmlFor="password">
                    <div className="form-label">Password</div>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        placeholder=""
                    />
                </label>

                <label className="form-block" htmlFor="occupation">
                    <div className="form-label">Occupation</div>
                    <select 
                        id="occupation" 
                        className="form-input"
                        disabled={occupations.length === 0}
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
                        disabled={states.length === 0}
                    >
                        <option />
                        {states.map((st) => (
                            <option key={st.abbreviation} value={st.abbreviation}>
                                {st.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button className="px-10 py-2 my-4 bg-gray-800 text-white rounded hover:bg-gray-400 w-full md:w-3/5">Add User</button>
            </form>
        </div>
    );
}

export default UserForm;