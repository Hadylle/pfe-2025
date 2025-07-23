import React from 'react';
import { Mail, ShieldCheck, User2, Edit2, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const UserRow = ({ user, onView, onModify, onDelete }) => {
  const isAdmin = user.role === 'ADMIN';

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between bg-white shadow-sm p-4 rounded-xl border border-gray-200"
    >
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div
          className={`rounded-full p-2 ${
            isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}
        >
          <User2 size={20} />
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <Mail size={14} className="mr-1" /> {user.email}
          </p>
        </div>
      </div>

      {/* Role and Actions */}
      <div className="flex items-center gap-4">
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium select-none ${
            isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}
        >
          <ShieldCheck size={14} className="inline mr-1" />
          {user.role}
        </span>

        {/* View Icon Button */}
        <button
          onClick={onView}
          aria-label={`View details of ${user.firstName} ${user.lastName}`}
          className="p-2 rounded hover:text-indigo-600 text-gray-600 transition"
          type="button"
          title="View"
        >
          <Eye size={20} />
        </button>

        {/* Modify Icon Button */}
        <button
          onClick={onModify}
          aria-label={`Modify ${user.firstName} ${user.lastName}`}
          className="p-2 rounded hover:text-yellow-500 text-gray-600 transition"
          type="button"
          title="Modify"
        >
          <Edit2 size={20} />
        </button>

        {/* Delete Icon Button */}
        <button
          onClick={onDelete}
          aria-label={`Delete ${user.firstName} ${user.lastName}`}
          className="p-2 rounded hover:text-red-600 text-gray-600 transition"
          type="button"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default UserRow;
