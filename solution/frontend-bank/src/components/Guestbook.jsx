import React from 'react';
import { useBank } from '../context/BankContext';
// TODO 2 (XSS): Import DOMPurify untuk mensanitasi komentar (di folder solution nanti)
import DOMPurify from 'dompurify';

export default function Guestbook() {
  const { comments, newComment, setNewComment, submitComment } = useBank();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Buku Tamu</h2>
      <div className="h-48 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
        {comments.map(c => (
          <div key={c.id} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-400 shadow-sm">
            {/* VULNERABILITY: Merender HTML tanpa sanitasi */}
            {/* TODO 2 (XSS): Gunakan DOMPurify.sanitize(c.text) di bawah ini */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.text) }} />
          </div>
        ))}
      </div>
      <form onSubmit={submitComment} className="flex gap-2">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
          className="border flex-1 p-2 rounded text-sm"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          Kirim
        </button>
      </form>
    </div>
  );
}
