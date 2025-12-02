import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
import api from '../../../../services/api';

const MessageView = () => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  
  const { state } = useLocation();
  const messageId = state?.messageId ?? null;
  
  const { markMessageAsRead, deleteMessage, messages, unreadMessages } = useAdmin();

  console.log({messages,unreadMessages})

  useEffect(() => {
    const handleInitialMessage = async () => {
      if (!messageId || !messages) return;

      const message = messages.find(msg => msg._id === messageId);
      if (message) {
        if (message.status === 'unread') {
          handleSelectMessage(message);
        }
      }
    };

    handleInitialMessage();
  }, [messageId, messages, markMessageAsRead]);

  const categories = [
    'all', 'academic', 'registration', 'financial', 'technical', 'administrative', 'other'
  ];

  const sortMessages = (messagesArray) => {
    if (!messagesArray) return [];
    
    const unreadMsgs = messagesArray.filter(msg => msg.status === 'unread');
    const readMsgs = messagesArray.filter(msg => msg.status === 'read');
    
    const sortedUnread = unreadMsgs.sort((a, b) => 
      new Date(a.submissionDate) - new Date(b.submissionDate)
    );
    
    const sortedRead = readMsgs.sort((a, b) => 
      new Date(b.submissionDate) - new Date(a.submissionDate)
    );
    
    return [...sortedUnread, ...sortedRead];
  };

  useEffect(() => {
    if (!messages) return;
    
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.studentId.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.studentId.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(message => message.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(message => message.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(message => message.priority === selectedPriority);
    }

    const sortedFiltered = sortMessages(filtered);
    setFilteredMessages(sortedFiltered);
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority, messages]);

  const handleSelectMessage = async (message) => {
  setSelectedMessage(message);

  // Get the latest response text if it exists
  const latestResponse = message.responses?.[message.responses.length - 1]?.responseText ?? '';
  setResponseText(latestResponse);

  if (message.status === 'unread') {
    markMessageAsRead(message._id);
  }
};


  const handleSubmitResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return;

    setIsResponding(true);
    
    try {
      setSelectedMessage(prev => ({ 
        ...prev, 
        response: responseText.trim()
      }));
      await api.patch(`/students/message/${selectedMessage._id}`, {
        response: responseText.trim()??null
      });
      
  
    } catch (error) {
      console.error('Error sending response:', error);
     
    } finally {
      setIsResponding(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      try {
        deleteMessage(messageId);
        await api.delete(`/students/message/${messageId}`);
        if (selectedMessage && selectedMessage._id === messageId) {
          setSelectedMessage(null);
          setResponseText('');
        }
        
      } catch (error) {
        console.error('Error deleting message:', error);
      
      }
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'high':
        return { icon: '🔴', color: '#e74c3c', label: 'High' };
      case 'medium':
        return { icon: '🟡', color: '#f39c12', label: 'Medium' };
      case 'low':
        return { icon: '🟢', color: '#27ae60', label: 'Low' };
      default:
        return { icon: '⚪', color: '#95a5a6', label: 'Normal' };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic':
        return '📚';
      case 'registration':
        return '📝';
      case 'financial':
        return '💰';
      case 'technical':
        return '💻';
      case 'administrative':
        return '🏛️';
      default:
        return '📨';
    }
  };

  const stats = {
    total: messages?.length || 0,
    unread: unreadMessages?.length || 0,
    responded: messages?.filter(m => m.responses && m.status === "read").length || 0,
    highPriority: messages?.filter(m => m.priority === 'high').length || 0
  };

  return (
    <div className="w-[60vw] relative top-0 left-[5vw]">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📨</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{stats.total}</h3>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔔</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{stats.unread}</h3>
              <p className="text-sm text-gray-600">Unread Messages</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{stats.responded}</h3>
              <p className="text-sm text-gray-600">Responded</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚨</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{stats.highPriority}</h3>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search messages by student, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[26vw] h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-4 ml-16">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories?.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[400px,1fr] gap-5 h-auto mt-5">
        {/* Messages List - Left Sidebar */}
        <div className="bg-gray-200 rounded-lg border border-gray-300 flex flex-col h-[30vw]">
          <div className="p-5 border-b border-gray-300 bg-indigo-200">
            <h3 className="m-0 mb-1 text-lg font-semibold">Messages ({filteredMessages.length})</h3>
            <div className="text-sm text-gray-600">
              Sorted: Unread (oldest first) → Read (newest first)
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(message => {
                const priorityInfo = getPriorityInfo(message.priority);
                const hasResponse = !!message.response;
                
                return (
                  <div
                    key={message.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                      message.status === 'unread' ? 'bg-yellow-50 font-medium' : ''
                    } ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-semibold mb-1 flex items-center gap-2">
                          {message.studentName || message.email}
                          {message.status === 'unread' && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span style={{ color: priorityInfo.color }}>
                            {priorityInfo.icon}
                          </span>
                          <span>
                            {new Date(message.submissionDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="font-medium mb-2 text-sm">
                      {getCategoryIcon(message.category)} {message.subject}
                    </div>
                    
                    <div className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {message.message?.substring(0, 80)}...
                    </div>
                    
                    <div className="flex gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.status === 'unread' 
                          ? 'bg-yellow-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {message.status}
                      </span>
                      {message.attachments?.length > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          📎
                        </span>
                      )}
                      {hasResponse && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          ✅
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                No messages found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Message Detail - Right Panel */}
        <div className="bg-gray-100 rounded-lg border border-gray-300 flex flex-col w-[40vw]">
          {selectedMessage ? (
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start p-5 border-b border-gray-300 bg-indigo-200">
                <div className="flex-1">
                  <h2 className="m-0 mb-2 text-xl font-semibold">
                    {getCategoryIcon(selectedMessage.category)} {selectedMessage.subject}
                  </h2>
                  <div 
                    className="inline-flex items-center justify-center px-2 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: getPriorityInfo(selectedMessage.priority).color, width: "30px" }}
                  >
                    {getPriorityInfo(selectedMessage.priority).icon}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded border-none cursor-pointer text-sm"
                    title="Delete Message"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div className="p-5 border-b border-gray-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <strong className="text-gray-600 text-sm">Student:</strong>
                    <span> {selectedMessage.studentId?.firstName || 'N/A'}{" "} {selectedMessage.studentId?.lastName || ''}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <strong className="text-gray-600 text-sm">Email:</strong>
                    <span>{selectedMessage.studentId.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <strong className="text-gray-600 text-sm">Program:</strong>
                    <span>{selectedMessage.program || 'N/A'} • Semester {selectedMessage.semester || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <strong className="text-gray-600 text-sm">Submitted:</strong>
                    <span>{new Date(selectedMessage.submissionDate).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-b border-gray-300 flex-1">
                <h4 className="m-0 mb-4 text-gray-900 font-semibold">Message:</h4>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
                
                {selectedMessage.attachments?.length > 0 && (
                  <div className="mt-5">
                    <h5 className="m-0 mb-2 text-gray-900 font-semibold">Attachments:</h5>
                    <div className="flex flex-col gap-1">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="px-3 py-2 bg-gray-50 rounded border border-gray-300">
                          📎 {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Response Section */}
              <div className="p-5 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="m-0 text-gray-900 font-semibold">Admin Response</h4>
                  {selectedMessage.response && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      ✅ Already Replied
                    </span>
                  )}
                </div>
                
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded resize-vertical font-sans text-sm mb-4"
                  rows="6"
                />
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleSubmitResponse}
                    disabled={isResponding || !responseText.trim()}
                    className="self-start px-4 py-2 bg-blue-500 text-white rounded border-none cursor-pointer text-sm hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isResponding ? 'Sending...' : '📤 Send Response'}
                  </button>
                  
                  {selectedMessage.response && (
                    <div className="bg-white p-4 rounded border border-gray-300">
                      <h5 className="m-0 mb-2 text-gray-900 font-semibold">Previous Response:</h5>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.response}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-center text-gray-600">
              <div className="text-5xl mb-5">📨</div>
              <h3 className="m-0 mb-2 text-gray-900 font-semibold">Select a message to view</h3>
              <p>Choose a message from the list to read its contents and respond to the student.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageView;