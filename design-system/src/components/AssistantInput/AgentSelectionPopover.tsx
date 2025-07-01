import React, { FunctionComponent } from 'react';

export interface Agent {
  name: string;
  handle: string;
  avatarUrl?: string;
}

export interface AgentSelectionPopoverProps {
  onClose?: () => void;
  agents: Agent[];
  selectedAgent?: string;
  onAgentSelect: (agent: Agent) => void;
}

export const AgentSelectionPopover: FunctionComponent<AgentSelectionPopoverProps> = ({
  onClose,
  agents = [
    { name: 'Presto', handle: '@pi' },
    { name: 'Planner', handle: '@ea' },
    { name: 'Sales', handle: '@sales' }
  ],
  selectedAgent,
  onAgentSelect
}) => {
  return (
    <div className="w-[320px] relative shadow-lg rounded-[24px] bg-bg-primary overflow-hidden flex flex-col items-start justify-start py-4 px-0 box-border text-left text-sm">
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-col items-start justify-start pt-0 px-0 pb-2 gap-3">
            {/* Header */}
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-8">
              <div className="self-stretch text-text-primary leading-5 font-semibold">Helpers</div>
            </div>

            {/* Agent List */}
            <div className="flex flex-col items-start justify-start">
              {agents.map((agent, index) => (
                <div key={agent.handle} className="w-80 h-16 flex flex-row items-center justify-start py-px px-0 box-border">
                  <button
                    onClick={() => onAgentSelect(agent)}
                    className={`flex-1 rounded-[24px] flex flex-col items-start justify-start py-2.5 px-4 hover:bg-bg-hover transition-colors ${
                      selectedAgent === agent.handle ? 'bg-bg-hover' : ''
                    }`}
                  >
                    <div className="self-stretch flex flex-row items-center justify-start gap-2">
                      <div className="w-8 h-8 relative rounded-full bg-bg-secondary overflow-hidden">
                        {agent.avatarUrl ? (
                          <img 
                            src={agent.avatarUrl} 
                            alt={agent.name}
                            className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-full bg-bg-tertiary" />
                        )}
                      </div>
                      <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                        <div className="text-text-primary leading-5 font-medium">{agent.name}</div>
                        <div className="text-text-tertiary leading-5">{agent.handle}</div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSelectionPopover; 