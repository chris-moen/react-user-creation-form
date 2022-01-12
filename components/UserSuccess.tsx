import React, { FC, MouseEventHandler } from 'react';

import { UserAPIPostData } from '../models';

const UserSuccess: FC<{
    className?: string;
    user: UserAPIPostData;
    resetHandler: MouseEventHandler<HTMLAnchorElement>;
}> = ({ className, user, resetHandler }) => {
    return (
        <div className={className}>
            <p>
                <strong>{user.name}</strong><br/>
                {user.email}<br /><br />
                <small>Occupation:</small><br/>
                {user.occupation}<br />
                <small>State:</small><br />
                {user.state}
            </p>
            <p>
                <a href="#" onClick={(e) => resetHandler(e)}>
                    Add Another User
                </a>
            </p>
        </div>
    );
};

export default UserSuccess;

