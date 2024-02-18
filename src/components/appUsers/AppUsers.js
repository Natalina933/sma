import Users from '@/app/dashboard/users/page';
import React from 'react';

const AppUsers = () => {
    const apiUrl = 'https://api.example.com/users';
    return (
        <div>
             <Users apiUrl={apiUrl} />
        </div>
    );
};

export default AppUsers;