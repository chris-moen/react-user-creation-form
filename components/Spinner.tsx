import { FC } from 'react';

const Spinner: FC = () => {
    return (
        <div className="flex items-center justify-center ">
            <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
        </div>
    );
}

export default Spinner;