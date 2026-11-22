import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, Paperclip, Phone, Video, FileText, Plus, UserPlus } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const MessagesPage: React.FC = () => {
  const { conversations, messages, sendMessage, isLoading, teamMembers, createConversation } = useDashboard();

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConv ? messages[activeConv.id] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    setIsCreating(true);
    setCreateError('');
    try {
      const conversation = await createConversation(selectedMemberId);
      setActiveConvId(conversation.id);
      setIsNewMessageOpen(false);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : 'Could not start the conversation.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white  border border-[#0b4f9c]/30 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[600px]">
      {/* Sidebar: Conversations List */}
      <div className="w-full md:w-80 border-r border-[#f3f6f9]  flex flex-col shrink-0">
        <div className="p-4 border-b border-[#f3f6f9]  space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-serif font-bold text-[#12202f] ">
              Messages
            </h2>
            <button
              type="button"
              onClick={() => {
                setSelectedMemberId(teamMembers[0]?.id || '');
                setCreateError('');
                setIsNewMessageOpen(true);
              }}
              title="Start a conversation"
              aria-label="Start a conversation"
              className="p-2 rounded-lg text-[#4a5a6a] hover:bg-[#f3f6f9]  "
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#0b4f9c]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#ffffff]  border border-[#0b4f9c]/40 rounded-xl text-xs text-[#12202f] "
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f3f6f9]/60 ">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors ${
                  isSelected
                    ? 'bg-[#0b4f9c]/20  border-l-4 border-[#4a5a6a] '
                    : 'hover:bg-[#ffffff]/50 '
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.participant.avatar}
                    alt={conv.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#0b4f9c]"
                  />
                  {conv.participant.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white " />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#12202f]  truncate">
                      {conv.participant.name}
                    </span>
                    <span className="text-[10px] text-[#4a5a6a]  shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#4a5a6a]  truncate mt-0.5">
                    {conv.lastMessage}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]/40 ">
        {activeConv ? (
          <>
        {/* Chat Header */}
        <div className="p-4 bg-white  border-b border-[#f3f6f9]  flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activeConv.participant.avatar}
              alt={activeConv.participant.name}
              className="w-9 h-9 rounded-full object-cover border border-[#0b4f9c]"
            />
            <div>
              <div className="text-xs font-bold text-[#12202f] ">
                {activeConv.participant.name}
              </div>
              <div className="text-[10px] text-[#4a5a6a] ">
                {activeConv.participant.role} â€¢ {activeConv.participant.online ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-[#4a5a6a]  hover:bg-[#f3f6f9]">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl text-[#4a5a6a]  hover:bg-[#f3f6f9]">
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Bubbles Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender.isSelf ? 'flex-row-reverse' : ''}`}
            >
              <img
                src={msg.sender.avatar}
                alt={msg.sender.name}
                className="w-8 h-8 rounded-full object-cover border border-[#0b4f9c] shrink-0"
              />

              <div className={`max-w-md space-y-1 ${msg.sender.isSelf ? 'text-right' : ''}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender.isSelf
                      ? 'bg-[#4a5a6a] text-white   rounded-tr-none'
                      : 'bg-white  border border-[#0b4f9c]/30 text-[#12202f]  rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}

                  {/* Attachments */}
                  {msg.attachments && (
                    <div className="mt-2 pt-2 border-t border-white/20  space-y-1">
                      {msg.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] bg-black/10  p-2 rounded-lg">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="font-semibold">{att.name} ({att.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-[#4a5a6a]/70  px-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white  border-t border-[#f3f6f9]  flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="p-2.5 rounded-xl text-[#4a5a6a]  hover:bg-[#f3f6f9]"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-[#ffffff]  border border-[#0b4f9c]/40 rounded-xl text-xs text-[#12202f]  focus:outline-none focus:ring-2 focus:ring-[#0b4f9c]"
          />

          <Button type="submit" variant="gold" size="sm" icon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-center">
            <div>
              <h2 className="text-sm font-bold text-[#12202f] ">
                {isLoading ? 'Loading conversations...' : 'No conversations yet'}
              </h2>
              {!isLoading && (
                <>
                  <p className="mt-2 text-xs text-[#4a5a6a] ">
                    {teamMembers.length
                      ? 'Start a conversation with someone on your team.'
                      : 'Invite someone to your team to start a conversation.'}
                  </p>
                  {teamMembers.length ? (
                    <Button
                      type="button"
                      variant="gold"
                      size="sm"
                      onClick={() => {
                        setSelectedMemberId(teamMembers[0].id);
                        setCreateError('');
                        setIsNewMessageOpen(true);
                      }}
                      icon={<Plus className="w-4 h-4" />}
                      className="mt-4"
                    >
                      New message
                    </Button>) : null}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isNewMessageOpen} onClose={() => setIsNewMessageOpen(false)} title="Start a conversation">
        {teamMembers.length ? (
          <form onSubmit={handleCreateConversation} className="space-y-4">
            <div>
              <label htmlFor="conversation-member" className="block text-xs font-semibold text-[#12202f]  mb-1">
                Team member
              </label>
              <select
                id="conversation-member"
                value={selectedMemberId}
                onChange={(event) => setSelectedMemberId(event.target.value)}
                className="w-full px-3 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50 rounded-xl text-sm"
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} Â· {member.role} Â· {member.status}
                  </option>
                ))}
              </select>
            </div>
            {createError && <p className="text-xs text-rose-600" role="alert">{createError}</p>}
            <div className="flex justify-end">
              <Button type="submit" variant="gold" size="sm" disabled={isCreating || !selectedMemberId}>
                {isCreating ? 'Starting...' : 'Start conversation'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-4 text-sm text-[#4a5a6a] ">No team members are available to message.</div>
        )}
      </Modal>
    </div>
  );
};

