import { useState, useCallback } from 'react';
import ContractsList from './ContractsList';
import ContractGenerator from './ContractGenerator';
import { useAdminAuth } from '../../../hooks/use-admin-auth';

export default function ContractsPage() {
  const { user, isAdmin, isLoading: authLoading } = useAdminAuth();
  const userName = user?.name;
  const [showGenerator, setShowGenerator] = useState(false);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [batchProgress, setBatchProgress] = useState('');

  const handleGenerateAll = useCallback(async () => {
    setIsBatchGenerating(true);
    setBatchProgress('Starting batch generation...');
    try {
      const { generateContractPdfForEmployee } = await import('../../../utils/generate-contract-pdf');
      const { teamMembersSeed } = await import('../../../data/admin/team-seed');

      for (let i = 0; i < teamMembersSeed.length; i++) {
        const member = teamMembersSeed[i];
        setBatchProgress(`Generating ${i + 1}/${teamMembersSeed.length}: ${member.name}`);
        await generateContractPdfForEmployee({ employeeName: member.name });
        // Small delay between downloads to avoid browser blocking
        await new Promise((r) => setTimeout(r, 400));
      }
      setBatchProgress(`Done! ${teamMembersSeed.length} contracts downloaded.`);
      setTimeout(() => { setIsBatchGenerating(false); setBatchProgress(''); }, 3000);
    } catch (err) {
      console.error('Batch generation failed:', err);
      setBatchProgress('Error generating contracts. Check console.');
      setTimeout(() => { setIsBatchGenerating(false); setBatchProgress(''); }, 5000);
    }
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ContractsList
        isAdmin={isAdmin}
        userName={userName}
        onGenerateClick={() => setShowGenerator(true)}
        onGenerateAllClick={isAdmin ? handleGenerateAll : undefined}
        isBatchGenerating={isBatchGenerating}
        batchProgress={batchProgress}
      />

      {showGenerator && (
        <ContractGenerator
          onClose={() => setShowGenerator(false)}
          onGenerated={() => {
            // Keep the generator open so the user sees the download happened.
            // They can close manually.
          }}
        />
      )}
    </>
  );
}
