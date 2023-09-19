import { useGetUserByIdQuery } from "../../../redux/api/user/userApi";

interface UserDetailProps {
    userID: number;
}

const UserDetail: React.FC<UserDetailProps> = ({ userID }) => {
    const { data: userData } = useGetUserByIdQuery(userID);

    if (!userData) {
        return null;
    }

    return (
        <div>
            <p>{userData.results.first_name} {userData.results.last_name} </p>
        </div>
    );
};

export default UserDetail;