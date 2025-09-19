import React, { useState, useRef, useEffect } from 'react';

export const DiseaseDetection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState('general');
    const [isDragOver, setIsDragOver] = useState(false);

    const fileInputRef = useRef(null);

    // Plant disease database for Kerala crops
    const diseaseDatabase = {
        coconut: {
            "bud_rot": {
                name: "Bud Rot / മുകുളം ചെംബൻ",
                symptoms: ["Crown yellowing", "Drooping of leaves", "Foul smell from bud"],
                treatment: [
                    "Remove infected tissue",
                    "Apply Bordeaux mixture (1%)",
                    "Spray with Mancozeb (0.3%)",
                    "Improve drainage"
                ],
                prevention: ["Regular crown cleaning", "Avoid water stagnation", "Apply prophylactic Bordeaux paste"]
            },
            "leaf_blight": {
                name: "Leaf Blight / ഇല കരിച്ചിൽ",
                symptoms: ["Brown spots on leaves", "Yellowing of fronds", "Dried leaf tips"],
                treatment: [
                    "Spray Propiconazole (0.1%)",
                    "Apply Carbendazim (0.1%)",
                    "Remove affected leaves"
                ],
                prevention: ["Regular pruning", "Balanced fertilization", "Maintain tree spacing"]
            }
        },
        rubber: {
            "leaf_spot": {
                name: "Leaf Spot / ഇല പുള്ളി രോഗം",
                symptoms: ["Circular spots on leaves", "Premature leaf fall", "Reduced latex yield"],
                treatment: [
                    "Spray Mancozeb (0.2%)",
                    "Apply Copper oxychloride (0.2%)",
                    "Use Carbendazim (0.1%)"
                ],
                prevention: ["Regular weeding", "Proper spacing", "Disease-resistant varieties"]
            },
            "powdery_mildew": {
                name: "Powdery Mildew / പൊടി രോഗം",
                symptoms: ["White powdery growth", "Leaf curling", "Stunted growth"],
                treatment: [
                    "Sulfur dusting",
                    "Spray Tridemorph (0.1%)",
                    "Apply Calixin (0.1%)"
                ],
                prevention: ["Avoid overhead irrigation", "Maintain air circulation", "Remove infected parts"]
            }
        },
        pepper: {
            "quick_wilt": {
                name: "Quick Wilt / പെട്ടെന്നുള്ള വാട്ടം",
                symptoms: ["Sudden wilting", "Yellowing of leaves", "Black roots"],
                treatment: [
                    "Drench with Copper oxychloride (0.2%)",
                    "Apply Trichoderma",
                    "Use Potassium phosphonate"
                ],
                prevention: ["Good drainage", "Resistant varieties", "Avoid water logging"]
            },
            "anthracnose": {
                name: "Anthracnose / കരിച്ചിൽ",
                symptoms: ["Black spots on berries", "Spike shedding", "Leaf spots"],
                treatment: [
                    "Spray Bordeaux mixture (1%)",
                    "Apply Mancozeb (0.3%)",
                    "Use Carbendazim (0.1%)"
                ],
                prevention: ["Shade regulation", "Balanced nutrition", "Timely harvest"]
            }
        },
        rice: {
            "blast": {
                name: "Blast Disease / ബ്ലാസ്റ്റ് രോഗം",
                symptoms: ["Diamond-shaped spots", "Node infection", "Neck rot"],
                treatment: [
                    "Spray Tricyclazole (0.06%)",
                    "Apply Isoprothiolane (0.1%)",
                    "Use Carbendazim (0.1%)"
                ],
                prevention: ["Resistant varieties", "Balanced fertilization", "Seed treatment"]
            },
            "sheath_blight": {
                name: "Sheath Blight / ഉറ കരിച്ചിൽ",
                symptoms: ["Oval spots on sheath", "Lodging", "Unfilled grains"],
                treatment: [
                    "Spray Validamycin (0.2%)",
                    "Apply Hexaconazole (0.1%)",
                    "Use Propiconazole (0.1%)"
                ],
                prevention: ["Proper spacing", "Avoid excess nitrogen", "Field sanitation"]
            }
        },
        banana: {
            "sigatoka": {
                name: "Sigatoka Leaf Spot / സിഗറ്റോക്ക",
                symptoms: ["Yellow streaks on leaves", "Brown spots", "Dried leaves"],
                treatment: [
                    "Spray Propiconazole (0.1%)",
                    "Apply mineral oil",
                    "Use Mancozeb (0.25%)"
                ],
                prevention: ["Remove infected leaves", "Good drainage", "Proper spacing"]
            },
            "panama_wilt": {
                name: "Panama Wilt / പനാമ വാട്ടം",
                symptoms: ["Yellowing of older leaves", "Splitting of pseudostem", "Internal discoloration"],
                treatment: [
                    "No cure - remove infected plants",
                    "Soil solarization",
                    "Apply Trichoderma"
                ],
                prevention: ["Use resistant varieties", "Crop rotation", "Clean planting material"]
            }
        }
    };

    const cropOptions = [
        { value: 'general', label: 'General' },
        { value: 'coconut', label: 'Coconut / നാളികേരം' },
        { value: 'rubber', label: 'Rubber / റബ്ബർ' },
        { value: 'pepper', label: 'Black Pepper / കുരുമുളക്' },
        { value: 'cardamom', label: 'Cardamom / ഏലക്കായ' },
        { value: 'rice', label: 'Rice / നെല്ല്' },
        { value: 'banana', label: 'Banana / വാഴ' },
        { value: 'tapioca', label: 'Tapioca / മരച്ചീനി' },
        { value: 'coffee', label: 'Coffee / കാപ്പി' },
        { value: 'tea', label: 'Tea / ചായ' },
        { value: 'ginger', label: 'Ginger / ഇഞ്ചി' },
        { value: 'turmeric', label: 'Turmeric / മഞ്ഞൾ' },
        { value: 'vegetables', label: 'Vegetables / പച്ചക്കറികൾ' }
    ];

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File size should be less than 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const performAnalysis = async () => {
        setIsAnalyzing(true);

        // Simulate analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        let detectedDiseases = [];

        if (selectedCrop !== 'general' && diseaseDatabase[selectedCrop]) {
            const diseases = Object.keys(diseaseDatabase[selectedCrop]);
            const primaryDisease = diseases[Math.floor(Math.random() * diseases.length)];
            const confidence = 65 + Math.random() * 30;

            detectedDiseases.push({
                disease: diseaseDatabase[selectedCrop][primaryDisease],
                confidence: confidence
            });

            if (diseases.length > 1) {
                const secondaryDisease = diseases.find(d => d !== primaryDisease);
                if (secondaryDisease) {
                    detectedDiseases.push({
                        disease: diseaseDatabase[selectedCrop][secondaryDisease],
                        confidence: 20 + Math.random() * 25
                    });
                }
            }
        } else {
            detectedDiseases.push({
                disease: {
                    name: "Fungal Infection",
                    symptoms: ["Leaf spots", "Discoloration", "Wilting"],
                    treatment: [
                        "Apply appropriate fungicide",
                        "Remove affected parts",
                        "Improve air circulation"
                    ],
                    prevention: ["Regular monitoring", "Proper spacing", "Avoid overwatering"]
                },
                confidence: 75
            });
        }

        setResults(detectedDiseases);
        setShowResults(true);
        setIsAnalyzing(false);
    };

    const getConfidenceColor = (confidence) => {
        if (confidence > 70) return 'bg-green-100 text-green-800';
        if (confidence > 40) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const ResultCard = ({ item }) => (
        <div className="bg-white rounded-2xl p-6 mb-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl font-bold text-gray-800 mb-3">{item.disease.name}</div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${getConfidenceColor(item.confidence)}`}>
                Confidence: {item.confidence.toFixed(1)}%
            </span>

            <div className="space-y-4">
                <div>
                    <h4 className="text-blue-600 font-semibold mb-2 flex items-center">
                        📋 Symptoms
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                        {item.disease.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                {symptom}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-blue-600 font-semibold mb-2 flex items-center">
                        💊 Treatment
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                        {item.disease.treatment.map((treatment, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                {treatment}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-blue-600 font-semibold mb-2 flex items-center">
                        🛡️ Prevention
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                        {item.disease.prevention.map((prevention, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                {prevention}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 flex items-center justify-center p-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-6xl w-full p-10 animate-fadeIn">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        🌿 Kerala Plant Disease Detection System
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Upload a photo of your crop to identify diseases and get treatment recommendations
                    </p>
                </div>

                {/* Crop Selector */}
                <div className="text-center mb-8">
                    <label className="text-gray-700 font-medium mr-4">Select your crop type:</label>
                    <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="px-6 py-3 rounded-full border-2 border-blue-400 text-gray-800 bg-white hover:border-purple-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 cursor-pointer"
                    >
                        {cropOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Upload Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Upload Area */}
                    <div className="flex-1 min-w-0">
                        <div
                            className={`border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-purple-50/50 hover:from-blue-100/60 hover:to-purple-100/60 hover:scale-105 ${isDragOver ? 'border-purple-500 bg-gradient-to-br from-blue-100/80 to-purple-100/80' : 'border-blue-400'
                                }`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="text-6xl mb-4">📷</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Click to upload or drag & drop</h3>
                            <p className="text-gray-600">Supports: JPG, PNG, JPEG (Max 10MB)</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-gray-100 rounded-2xl min-h-80 flex items-center justify-center overflow-hidden">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Plant preview"
                                    className="max-w-full max-h-96 object-contain rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-500">Image preview will appear here</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center mb-10">
                    <button
                        onClick={performAnalysis}
                        disabled={!selectedImage || isAnalyzing}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1"
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center">
                                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                                Analyzing...
                            </span>
                        ) : (
                            'Analyze Plant Disease'
                        )}
                    </button>
                </div>

                {/* Results Section */}
                {showResults && (
                    <div className="animate-slideUp">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Results</h2>
                        <div className="space-y-5">
                            {results.map((item, index) => (
                                <ResultCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease;
        }
      `}</style>
        </div>
    );
};

