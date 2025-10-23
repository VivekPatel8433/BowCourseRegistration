import React, { useState, useEffect } from 'react';
import './message-view.css';
import {messages as messageInfo} from '../../../../data/messages'
import {useLocation } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
const MessageView = ({viewMessage}) => {
  const [messages, setMessages] = useState(messageInfo);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const {state} = useLocation();
  const messageId =state?.messageId??null
   // use custome hook
   const {setReadId,setDeletedMessageId}=useAdmin();
 useEffect(() => {
  if (!messageId) return;

  const msgIndex = messages.findIndex(msg => msg.id === messageId);

  if (msgIndex !== -1) {
    messages[msgIndex].status = 'read';
     setReadId(messageId)
    setMessages([...messages]);

    handleSelectMessage(messages[msgIndex]);
  }
}, [messageId]);

 // Listen for new incoming message from parent
  useEffect(() => {
    if (!viewMessage) return;

    const newMessage = {
      id: messages.length + 1,      // unique id as total length + 1
      studentName: "Unkown Student",       
      studentId: viewMessage.studentId || "N/A",
      email: viewMessage.from || "",
      program: viewMessage.program || "",
      semester: viewMessage.semester || 1,
      subject: viewMessage.subject || "No Subject",
      message: viewMessage.message || viewMessage.text || "",
      attachments: viewMessage.file ? [viewMessage.file.name] : [],
      category: viewMessage.category || "other",
      priority: viewMessage.priority || "normal",
      status: 'unread',
      submissionDate: new Date().toISOString(),
      response: ''
    };

    setMessages(prev => [...prev, newMessage]);
    setFilteredMessages(prev => [...prev, newMessage]);
    
  }, [viewMessage]);
  // Categories for filtering
  const categories = [
    'all', 'academic', 'registration', 'financial', 'technical', 'administrative', 'other'
  ];

  // Sort messages: unread (longest to recent) then read (recent to longest)
  const sortMessages = (messagesArray) => {
    const unreadMessages = messagesArray.filter(msg => msg.status === 'unread');
    const readMessages = messagesArray.filter(msg => msg.status === 'read');
    
    // Sort unread: longest to recent (oldest first)
    const sortedUnread = unreadMessages.sort((a, b) => 
      new Date(a.submissionDate) - new Date(b.submissionDate)
    );
    
    // Sort read: recent to longest (newest first)
    const sortedRead = readMessages.sort((a, b) => 
      new Date(b.submissionDate) - new Date(a.submissionDate)
    );
    
    return [...sortedUnread, ...sortedRead];
  };

  // Filter messages based on search and filters
  useEffect(() => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase())
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

    // Apply sorting
    const sortedFiltered = sortMessages(filtered);
    setFilteredMessages(sortedFiltered);
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority, messages]);

  // Mark message as read
  const markAsRead = (messageId) => {
    setReadId(messageId)
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
  };

  // Select message to view
  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setResponseText(message.response || '');
    if (message.status === 'unread') {
      markAsRead(message.id);
      
    }
  };

  // Handle response submission
  const handleSubmitResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return;

    setIsResponding(true);
    
    try {
      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === selectedMessage.id 
            ? { 
                ...msg, 
                response: responseText.trim(),
                status: 'read'
              }
            : msg
        ));
        setSelectedMessage(prev => ({ ...prev, response: responseText.trim() }));
        setIsResponding(false);
        alert('Response sent successfully!');
      }, 1000);
    } catch (error) {
      alert('Error sending response. Please try again.');
      setIsResponding(false);
    }
  };

  // Delete message
  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      setDeletedMessageId(messageId)
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
      
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    setMessages(prev => prev.map(msg => ({ ...msg, status: 'read' })));
  };

  // Get priority icon and color
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

  // Get category icon
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

  // Calculate statistics
  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    responded: messages.filter(m => m.response).length,
    highPriority: messages.filter(m => m.priority === 'high').length
  };

  return (
    <div className="message-view">
      <div className="message-view-header">
        <h1>Student Messages</h1>
       
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Messages</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{stats.unread}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.responded}</h3>
            <p>Responded</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <h3>{stats.highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-filters">
          <div className="Search-box">
            <input
              type="text"
              placeholder="Search messages by student, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
           
          </div>
          
          <div className="filter-group" style={{marginLeft:60}} >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
        
        
      </div>

      <div className="messages-container">
        {/* Messages List - Left Sidebar */}
        <div className="messages-list">
          <div className="messages-list-header">
            <h3>Messages ({filteredMessages.length})</h3>
            <div className="sort-info">
              Sorted: Unread (oldest first) → Read (newest first)
            </div>
          </div>
          
          <div className="messages-scroll">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(message => {
                const priorityInfo = getPriorityInfo(message.priority);
                const hasResponse = !!message.response;
                
                return (
                  <div
                    key={message.id}
                    className={`message-item ${message.status} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="message-header">
                      <div className="student-info">
                        <div className="student-name">
                          {message.studentName}
                          {message.status === 'unread' && <span className="unread-dot"></span>}
                        </div>
                        <div className="message-meta">
                          <span className="priority" style={{ color: priorityInfo.color }}>
                            {priorityInfo.icon}
                          </span>
                          <span className="date">
                            {new Date(message.submissionDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="message-subject">
                      {getCategoryIcon(message.category)} {message.subject}
                    </div>
                    
                    <div className="message-preview">
                      {message.message.substring(0, 80)}...
                    </div>
                    
                    <div className="message-footer">
                      <div className="message-tags">
                        <span className={`status-tag ${message.status}`}>
                          {message.status}
                        </span>
                        {message.attachments.length > 0 && (
                          <span className="attachment-tag">
                            📎
                          </span>
                        )}
                        {hasResponse && (
                          <span className="response-tag">
                            ✅
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-messages">
                No messages found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Message Detail View - Right Panel */}
        <div className="message-detail">
          {selectedMessage ? (
            <div className="message-detail-content">
              <div className="detail-header">
                <div className="detail-subject">
                  <h2>{getCategoryIcon(selectedMessage.category)} {selectedMessage.subject}</h2>
                  <div className="priority-badge" style={{ 
                    backgroundColor: getPriorityInfo(selectedMessage.priority).color ,width:"30px"
                  }}>
                    {getPriorityInfo(selectedMessage.priority).icon} {/*{getPriorityInfo(selectedMessage.priority).label}*/}
                  </div>
                </div>
                
                <div className="detail-actions">
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="btn btn-delete"
                    title="Delete Message"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div className="student-info-detail">
                <div className="info-grid">
                  <div className="info-item">
                    <strong>Student:</strong> 
                    <span>{selectedMessage.studentName} ({selectedMessage.studentId})</span>
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> 
                    <span>{selectedMessage.email}</span>
                  </div>
                  <div className="info-item">
                    <strong>Program:</strong> 
                    <span>{selectedMessage.program} • Semester {selectedMessage.semester}</span>
                  </div>
                  <div className="info-item">
                    <strong>Submitted:</strong> 
                    <span>{new Date(selectedMessage.submissionDate).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="message-content">
                <h4>Message:</h4>
                <div className="message-text">
                  {selectedMessage.message}
                </div>
                
                {selectedMessage.attachments.length > 0 && (
                  <div className="attachments">
                    <h5>Attachments:</h5>
                    <div className="attachment-list">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="attachment-item">
                          📎 {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Response Section with Reply Button */}
              <div className="response-section">
                <div className="response-header">
                  <h4>Admin Response</h4>
                  {selectedMessage.response && (
                    <span className="replied-indicator">✅ Already Replied</span>
                  )}
                </div>
                
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  className="response-textarea"
                  rows="6"
                />
                
                <div className="response-actions">
                  <button
                    onClick={handleSubmitResponse}
                    disabled={isResponding || !responseText.trim()}
                    className="btn btn-primary reply-btn"
                  >
                    {isResponding ? 'Sending...' : '📤 Send Response'}
                  </button>
                  
                  {selectedMessage.response && (
                    <div className="existing-response">
                      <h5>Previous Response:</h5>
                      <div className="response-text">
                        {selectedMessage.response}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">📨</div>
              <h3>Select a message to view</h3>
              <p>Choose a message from the list to read its contents and respond to the student.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageView;