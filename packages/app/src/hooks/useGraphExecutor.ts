import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedExecutorState } from '../state/execution';
import { useExecutorSidecar } from './useExecutorSidecar';
import { useLocalExecutor } from './useLocalExecutor';
import { useRemoteExecutor } from './useRemoteExecutor';

export function useGraphExecutor() {
  const selectedExecutor = useRecoilValue(selectedExecutorState);
  const localExecutor = useLocalExecutor();
  const remoteExecutor = useRemoteExecutor();

  useExecutorSidecar({ enabled: selectedExecutor === 'node' });

  const executor = remoteExecutor.active ? remoteExecutor : localExecutor;

  useEffect(() => {
    if (selectedExecutor === 'node') {
      remoteExecutor.remoteDebugger.connect('ws://localhost:21889');
    } else {
      remoteExecutor.remoteDebugger.disconnect();
    }

    return () => {
      remoteExecutor.remoteDebugger.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExecutor]);

  return {
    tryRunGraph: executor.tryRunGraph,
    tryAbortGraph: executor.tryAbortGraph,
    tryPauseGraph: executor.tryPauseGraph,
    tryResumeGraph: executor.tryResumeGraph,
  };
}
