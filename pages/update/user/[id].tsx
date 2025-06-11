import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { User } from 'next-auth';

export default function UserSettingsPage() {
  const router = useRouter();
  const { id } = router.query;

  const userId = Array.isArray(id) ? id[0] : id;

  const { data, loading, error, put } = useFetch<User>(userId ? `/api/update-credentials/${userId}` : '');

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  // Set currentEmail from localStorage
  useEffect(() => {
    const email = localStorage.getItem('email');
    setCurrentEmail(email);
  }, []);

  // Initialize newEmail when user data arrives
  useEffect(() => {
    if (data?.email) {
      setNewEmail(data.email);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentEmail) {
      alert("No email found in localStorage. Are you logged in?");
      return;
    }

    try {
      await put({ currentEmail, newEmail, newPassword });

      if (newEmail) {
        localStorage.setItem('email', newEmail);
        setCurrentEmail(newEmail);
      }
      alert('User updated successfully!');
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    }
  };

  if (!userId) {
    return <p className="text-center mt-10 text-gray-600">Loading user data...</p>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          User Settings (ID: {userId})
        </h1>

        {loading && <p>Loading user data...</p>}

        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
              placeholder="Leave blank to keep current password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-colors duration-200`}
          >
            {loading ? 'Updating...' : 'Update Credentials'}
          </button>
        </form>

        {data && !error && typeof data === 'object' && 'message' in data ? (
          <p className="text-green-500 mt-4">{(data as { message: string }).message}</p>
        ) : null}
      </div>
    </div>
  );
}
