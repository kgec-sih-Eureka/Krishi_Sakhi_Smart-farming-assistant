import React, { useState } from 'react';
import { Leaf, MapPin, Thermometer, Users, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

export function CropRecommend() {
    const [formData, setFormData] = useState({
        location: '',
        district: '',
        totalLand: '',
        soilType: '',
        waterAvailability: '',
        budget: '',
        experience: '',
        riskTolerance: '',
        marketAccess: ''
    });

    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

    const keralaDistricts = [
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Idukki',
        'Ernakulam',
        'Thrissur',
        'Palakkad',
        'Malappuram',
        'Kozhikode',
        'Wayanad',
        'Kannur',
        'Kasaragod'
    ];

    const soilTypes = [
        'Laterite Soil',
        'Alluvial Soil',
        'Red Soil',
        'Sandy Soil',
        'Clay Soil',
        'Peaty Soil'
    ];

    const cropData = {
        Rice: {
            suitableSoil: ['Alluvial Soil', 'Clay Soil'],
            waterNeed: 'High',
            profitability: 3,
            riskLevel: 'Low',
            landPercent: 0.3,
            expectedYield: 4500,
            pricePerKg: 25,
            costPerHectare: 45000
        },
        Coconut: {
            suitableSoil: ['Laterite Soil', 'Sandy Soil'],
            waterNeed: 'Medium',
            profitability: 4,
            riskLevel: 'Low',
            landPercent: 0.25,
            expectedYield: 16000,
            pricePerKg: 12,
            costPerHectare: 35000
        },
        Rubber: {
            suitableSoil: ['Laterite Soil', 'Red Soil'],
            waterNeed: 'Medium',
            profitability: 4,
            riskLevel: 'Medium',
            landPercent: 0.4,
            expectedYield: 1800,
            pricePerKg: 180,
            costPerHectare: 25000
        },
        Pepper: {
            suitableSoil: ['Laterite Soil', 'Red Soil'],
            waterNeed: 'Medium',
            profitability: 5,
            riskLevel: 'High',
            landPercent: 0.1,
            expectedYield: 2000,
            pricePerKg: 450,
            costPerHectare: 80000
        },
        Cardamom: {
            suitableSoil: ['Red Soil', 'Peaty Soil'],
            waterNeed: 'High',
            profitability: 5,
            riskLevel: 'High',
            landPercent: 0.15,
            expectedYield: 200,
            pricePerKg: 1200,
            costPerHectare: 120000
        },
        Banana: {
            suitableSoil: ['Alluvial Soil', 'Clay Soil'],
            waterNeed: 'High',
            profitability: 4,
            riskLevel: 'Medium',
            landPercent: 0.2,
            expectedYield: 25000,
            pricePerKg: 15,
            costPerHectare: 60000
        },
        Tapioca: {
            suitableSoil: ['Laterite Soil', 'Sandy Soil'],
            waterNeed: 'Low',
            profitability: 3,
            riskLevel: 'Low',
            landPercent: 0.2,
            expectedYield: 20000,
            pricePerKg: 8,
            costPerHectare: 30000
        },
        Ginger: {
            suitableSoil: ['Red Soil', 'Laterite Soil'],
            waterNeed: 'High',
            profitability: 4,
            riskLevel: 'Medium',
            landPercent: 0.1,
            expectedYield: 12000,
            pricePerKg: 80,
            costPerHectare: 90000
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateRecommendations = () => {
        setLoading(true);

        setTimeout(() => {
            const suitableCrops = Object.entries(cropData).filter(([crop, data]) => {
                const soilMatch = data.suitableSoil.includes(formData.soilType);
                const waterMatch = (formData.waterAvailability === 'High') ||
                    (formData.waterAvailability === 'Medium' && data.waterNeed !== 'High') ||
                    (formData.waterAvailability === 'Low' && data.waterNeed === 'Low');
                const riskMatch = (formData.riskTolerance === 'High') ||
                    (formData.riskTolerance === 'Medium' && data.riskLevel !== 'High') ||
                    (formData.riskTolerance === 'Low' && data.riskLevel === 'Low');

                return soilMatch && waterMatch && riskMatch;
            });

            suitableCrops.sort((a, b) => b[1].profitability - a[1].profitability);

            const totalLandHectares = parseFloat(formData.totalLand);
            const budget = parseFloat(formData.budget);

            const cropAllocations = suitableCrops.slice(0, 4).map(([crop, data]) => {
                const allocatedLand = totalLandHectares * data.landPercent;
                const totalCost = allocatedLand * data.costPerHectare;
                const totalRevenue = allocatedLand * data.expectedYield * data.pricePerKg;
                const netProfit = totalRevenue - totalCost;

                return {
                    crop,
                    data,
                    allocatedLand: allocatedLand.toFixed(2),
                    totalCost: Math.round(totalCost),
                    totalRevenue: Math.round(totalRevenue),
                    netProfit: Math.round(netProfit),
                    roiPercent: ((netProfit / totalCost) * 100).toFixed(1)
                };
            });

            const totalProfit = cropAllocations.reduce((sum, alloc) => sum + alloc.netProfit, 0);
            const totalCost = cropAllocations.reduce((sum, alloc) => sum + alloc.totalCost, 0);

            setRecommendations({
                cropAllocations,
                totalProfit: Math.round(totalProfit),
                totalCost: Math.round(totalCost),
                overallROI: ((totalProfit / totalCost) * 100).toFixed(1),
                budgetFeasible: totalCost <= budget
            });

            setLoading(false);
        }, 2000);
    };

    const handleSubmit = () => {
        calculateRecommendations();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-15 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Leaf className="h-8 w-8" />
                        Kerala Farmer Crop Optimization System
                    </h1>
                    <p className="mt-2 opacity-90">Maximize your farm profitability with data-driven crop recommendations</p>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-green-600" />
                                Location Details
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select District</option>
                                    {keralaDistricts.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location/Village</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your village/area"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Land (Hectares)</label>
                                <input
                                    type="number"
                                    name="totalLand"
                                    value={formData.totalLand}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter land size"
                                    step="0.1"
                                    min="0.1"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Thermometer className="h-5 w-5 text-green-600" />
                                Farm Conditions
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Soil Type</option>
                                    {soilTypes.map(soil => (
                                        <option key={soil} value={soil}>{soil}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
                                <select
                                    name="waterAvailability"
                                    value={formData.waterAvailability}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Water Availability</option>
                                    <option value="High">High (River/Canal/Bore well)</option>
                                    <option value="Medium">Medium (Pond/Rain dependent)</option>
                                    <option value="Low">Low (Rain only)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Market Access</label>
                                <select
                                    name="marketAccess"
                                    value={formData.marketAccess}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Market Access</option>
                                    <option value="Excellent">Excellent (less than 5km to market)</option>
                                    <option value="Good">Good (5-15km to market)</option>
                                    <option value="Average">Average (15-30km to market)</option>
                                    <option value="Poor">Poor (more than 30km to market)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                Your Preferences
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Available Budget (₹)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter total budget"
                                    min="10000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Farming Experience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Experience</option>
                                    <option value="Beginner">Beginner (0-2 years)</option>
                                    <option value="Intermediate">Intermediate (3-10 years)</option>
                                    <option value="Expert">Expert (10+ years)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                                <select
                                    name="riskTolerance"
                                    value={formData.riskTolerance}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Risk Level</option>
                                    <option value="Low">Low Risk (Stable returns)</option>
                                    <option value="Medium">Medium Risk (Balanced)</option>
                                    <option value="High">High Risk (High returns)</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !formData.district || !formData.totalLand || !formData.soilType || !formData.waterAvailability || !formData.budget || !formData.riskTolerance}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        Analyzing Your Farm...
                                    </>
                                ) : (
                                    <>
                                        <Calculator className="h-6 w-6" />
                                        Generate Crop Recommendations
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {recommendations && (
                        <div className="mt-8 space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-6 w-6 text-blue-600" />
                                    Recommended Crop Portfolio
                                </h3>

                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600">₹{recommendations.totalProfit.toLocaleString()}</div>
                                        <div className="text-sm text-gray-600">Expected Profit</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">₹{recommendations.totalCost.toLocaleString()}</div>
                                        <div className="text-sm text-gray-600">Total Investment</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">{recommendations.overallROI}%</div>
                                        <div className="text-sm text-gray-600">Return on Investment</div>
                                    </div>
                                </div>

                                {!recommendations.budgetFeasible && (
                                    <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
                                        <div className="flex items-center gap-2 text-red-700">
                                            <AlertCircle className="h-5 w-5" />
                                            <span className="font-semibold">Budget Alert:</span>
                                        </div>
                                        <p className="text-red-600 mt-1">The recommended plan exceeds your budget. Consider reducing land allocation or selecting lower-cost crops.</p>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-4">
                                    {recommendations.cropAllocations.map((allocation, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold text-lg text-gray-800">{allocation.crop}</h4>
                                            <div className="mt-2 space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Land Allocation:</span>
                                                    <span className="font-medium">{allocation.allocatedLand} hectares</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Investment:</span>
                                                    <span className="font-medium">₹{allocation.totalCost.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Expected Revenue:</span>
                                                    <span className="font-medium text-green-600">₹{allocation.totalRevenue.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Net Profit:</span>
                                                    <span className="font-bold text-green-600">₹{allocation.netProfit.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">ROI:</span>
                                                    <span className="font-bold text-purple-600">{allocation.roiPercent}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

