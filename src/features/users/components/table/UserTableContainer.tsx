import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import UserTable from "./UserTable";
import { UserService, User } from "../../services/user.service";

const UserTableContainer = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const userService = new UserService();

      try {
        const response = await userService.getAllUsers();
        setUserList(response.users);
      } catch (err) {
        setError((err as AxiosError).message || "An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDelete = (id: number) => {
    setUserList((prev) => prev.filter((user) => user.id !== id));
  };

  const handleEditButtonClick = (user: User) => {
    setEditUser(user);
  };

  const handleCancelEditUser = () => {
    setEditUser(null);
  };

  const handleUserFieldChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setEditUser((prev) => {
      if (!prev || prev.id !== id) return prev;
      return { ...prev, firstName: event.target.value };
    });
  };

  const handleSaveUserButtonClick = () => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === editUser?.id ? { ...user, ...editUser } : user
      )
    );
    setEditUser(null);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <UserTable
        userList={userList}
        editUser={editUser}
        onUserDelete={handleUserDelete}
        onEditButtonClick={handleEditButtonClick}
        onCancelEditUser={handleCancelEditUser}
        onUserFieldChange={handleUserFieldChange}
        onSaveUserButtonClick={handleSaveUserButtonClick}
      />
    </div>
  );
};

export default UserTableContainer;
