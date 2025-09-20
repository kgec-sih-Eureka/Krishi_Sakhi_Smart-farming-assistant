import React, { useState, useRef, useEffect } from 'react';

export const Chatbot = () => {
    // API Key - In a real app, this would come from environment variables
    // For this demo, you can replace this with your actual API key
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';

    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your General Farming Assistant. Ask me about crop cultivation, livestock management, soil health, pest control, irrigation, organic farming, or any agricultural questions you have!",
            sender: 'bot',
            id: Date.now()
        }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBoxRef = useRef(null);

    // Gemini API URL
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const addMessage = (text, sender) => {
        const newMessage = {
            text,
            sender,
            id: Date.now() + Math.random()
        };
        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    };

    // General farming context for better AI responses
    const getFarmingContext = () => {
        return `You are a comprehensive farming and agriculture expert assistant. Provide specific advice for various farming practices, crops, and agricultural conditions worldwide. Cover topics including:

CROP CATEGORIES:
- Cereal crops: Wheat, rice, corn, barley, oats, sorghum
- Legumes: Beans, peas, lentils, soybeans, chickpeas
- Fruits: Apples, oranges, bananas, berries, tropical fruits
- Vegetables: Tomatoes, peppers, leafy greens, root vegetables
- Cash crops: Cotton, tobacco, sugarcane, coffee, tea
- Forage crops: Alfalfa, clover, grass species for livestock

FARMING PRACTICES:
- Soil management and fertility
- Irrigation systems and water management
- Pest and disease control (IPM)
- Crop rotation and companion planting
- Organic vs. conventional farming
- Sustainable agriculture practices
- Precision farming and technology

LIVESTOCK MANAGEMENT:
- Cattle, sheep, goats, pigs, poultry
- Feed management and nutrition
- Animal health and veterinary care
- Breeding and reproduction
- Housing and facility management

ENVIRONMENTAL CONSIDERATIONS:
- Climate adaptation strategies
- Soil conservation techniques
- Water conservation methods
- Biodiversity and ecosystem health
- Carbon footprint reduction

FARM BUSINESS:
- Market analysis and crop selection
- Cost management and budgeting
- Equipment selection and maintenance
- Storage and post-harvest handling

Always provide practical, science-based advice that considers different climate zones, soil types, and farming scales (small-scale to commercial). Include both traditional and modern farming techniques where appropriate.`;
    };

    const callGeminiAPI = async (userMessage) => {
        const context = getKeralaFarmingContext();
        const prompt = `${context}\n\nUser Question: ${userMessage}\n\nProvide helpful, specific advice for Kerala farmers:`;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Unexpected API response format');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    };

    const handleMessage = async () => {
        const userText = userInput.trim();
        if (userText === "") return;

        // Add user message
        addMessage(userText, "user");
        setUserInput("");
        setIsLoading(true);

        try {
            // Call Gemini API
            const response = await callGeminiAPI(userText);
            addMessage(response, "bot");
        } catch (error) {
            console.error('Error:', error);

            // Fallback responses for common Kerala farming queries
            const fallbackResponses = {
                'coconut': 'For coconut (നാളികേരം) cultivation: Plant in well-drained soil, maintain 7.5m spacing, apply organic manure regularly. Common diseases: Bud rot - apply Bordeaux mixture, Root wilt - improve drainage and use Trichoderma.',
                'rubber': 'Rubber (റബ്ബർ) cultivation: Best planted during monsoon, 6-year gestation period. Tapping starts from 7th year. Apply fertilizers in May-June and September-October. Watch for leaf diseases and treat with copper-based fungicides.',
                'rice': 'Rice (നെല്ല്) in Kerala: Varieties like Jyothi (120 days), Kanchana (115 days) are popular. Plant during Kharif (June-July). Use 20-25 kg seeds/hectare. Apply NPK fertilizers as per soil test recommendations.',
                'pepper': 'Black pepper (കുരുമുളക്) cultivation: Provide support trees like coconut or silver oak. Plant during monsoon with 2.5m spacing. Apply organic manure and ensure proper drainage to prevent quick wilt disease.',
                'spices': 'Kerala spice cultivation: Cardamom thrives in shade at 900-1200m elevation. Ginger and turmeric planted in April-May. Use well-decomposed organic matter and ensure proper drainage during heavy rains.',
                'weather': 'Kerala weather for farming: Southwest monsoon (June-September) is main growing season. Post-monsoon (October-December) good for land preparation. Avoid planting sensitive crops during peak monsoon due to waterlogging.',
                'fertilizer': 'Kerala soil management: Most soils are acidic, apply lime periodically. Use organic manures like cow dung, compost. For chemical fertilizers, follow soil test recommendations. Coconut needs potassium-rich fertilizers.',
                'pest': 'Common Kerala pests: Red palm weevil in coconut - use pheromone traps. Rice brown planthopper - use light traps. Pepper quick wilt - improve drainage. Always prefer IPM approaches suitable for high humidity conditions.'
            };

            let fallbackResponse = "I apologize for the technical issue. As a Kerala farming assistant, I'm here to help with coconut, rubber, rice, spices, and other Kerala-specific crops. Please ask about specific farming challenges you're facing.";

            // Simple keyword matching for fallback
            for (const [keyword, answer] of Object.entries(fallbackResponses)) {
                if (userText.toLowerCase().includes(keyword)) {
                    fallbackResponse = answer;
                    break;
                }
            }

            addMessage(fallbackResponse, "bot");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleMessage();
        }
    };

    const quickQuestions = [
        { en: "Crop rotation", query: "What are the benefits of crop rotation and how do I implement it?" },
        { en: "Soil testing", query: "How often should I test my soil and what should I look for?" },
        { en: "Pest control", query: "What are effective integrated pest management strategies?" },
        { en: "Organic farming", query: "How do I transition from conventional to organic farming?" },
        { en: "Irrigation systems", query: "Which irrigation system is best for my crop and climate?" },
        { en: "Plant diseases", query: "How can I identify and treat common plant diseases?" }
    ];

    const LoadingMessage = () => (
        <div className="message bot mb-3 max-w-xs bg-green-100 text-green-800 rounded-2xl px-4 py-2 self-start animate-pulse">
            <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm">കൃഷി വിദഗ്ധൻ ചിന്തിക്കുന്നു...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl h-[700px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-green-200">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🌴</span>
                            <div>
                                <h2 className="text-lg font-bold">Kerala Krishi Sahayak</h2>
                                <p className="text-sm opacity-90">കേരള കൃഷി സഹായക</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">🥥</span>
                            <span className="text-2xl">🌶️</span>
                            <span className="text-2xl">🌾</span>
                        </div>
                    </div>

                    {/* API Key Warning */}
                    {(!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') && (
                        <div className="mt-2 p-2 bg-yellow-500 bg-opacity-20 rounded text-sm">
                            ⚠️ Please add your Gemini API key to enable AI responses
                        </div>
                    )}
                </div>

                {/* Chat Box */}
                <div
                    ref={chatBoxRef}
                    className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 bg-gradient-to-b from-blue-50/30 to-white"
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.sender} max-w-[85%] rounded-2xl px-4 py-3 break-words shadow-sm ${message.sender === 'user'
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white self-end ml-auto'
                                    : 'bg-white text-gray-800 self-start border border-blue-100'
                                }`}
                        >
                            <div className="whitespace-pre-wrap">{message.text}</div>
                        </div>
                    ))}

                    {/* Loading Message */}
                    {isLoading && <LoadingMessage />}
                </div>

                {/* Quick Questions */}
                <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                    <p className="text-xs text-blue-700 mb-2 font-medium">Quick Questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {quickQuestions.slice(0, 3).map((q, index) => (
                            <button
                                key={index}
                                onClick={() => setUserInput(q.query)}
                                className="px-3 py-1 text-xs bg-blue-200 text-blue-700 rounded-full hover:bg-blue-300 transition-colors duration-200 flex-shrink-0"
                                disabled={isLoading}
                            >
                                {q.en}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-blue-200 bg-white">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about crops, livestock, soil, irrigation, organic farming..."
                            className="flex-1 px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-sm"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleMessage}
                            disabled={isLoading || userInput.trim() === ''}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* More Quick Actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {quickQuestions.slice(3).map((q, index) => (
                            <button
                                key={index + 3}
                                onClick={() => setUserInput(q.query)}
                                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                {q.en}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-blue-600 text-center">
                    <p className="text-xs text-blue-100">
                        Powered by AI • Your Comprehensive Farming Assistant
                    </p>
                </div>
            </div>
        </div>
    );
};

