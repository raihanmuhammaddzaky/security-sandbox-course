import { useState, useEffect } from 'react';
import { apiGetComments, apiAddComment } from '../api/bankApi';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await apiGetComments();
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Gagal mengambil komentar', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAddComment(newComment);
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { comments, newComment, setNewComment, submitComment };
};
