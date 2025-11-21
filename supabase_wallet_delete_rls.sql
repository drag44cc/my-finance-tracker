-- RLS Policy untuk Delete Wallet
-- Jalankan query ini di Supabase SQL Editor

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Users can delete their own wallets" ON wallets;

-- Create delete policy
CREATE POLICY "Users can delete their own wallets"
ON wallets
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'wallets'
ORDER BY policyname;
