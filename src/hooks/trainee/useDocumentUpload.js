import { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export const useDocumentUpload = () => {
  const supabase = useSupabase();
  const { user } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadDocument = async (documentId, file, documentName) => {
    setLoading(true);
    setError(null);

    try {
      // Upload file to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`${user.id}/${documentName}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the file URL
      const fileUrl = data.Key;

      // Insert document record into the documents table
      const { error: insertError } = await supabase
        .from('documents')
        .insert([
          { id: documentId, document_name: documentName, file_url: fileUrl, user_id: user.id },
        ]);

      if (insertError) {
        throw insertError;
      }

      setLoading(false);
      return fileUrl;
    } catch (error) {
      setError(error);
      setLoading(false);
      return null;
    }
  };

  return {
    uploadDocument,
    loading,
    error,
  };
};