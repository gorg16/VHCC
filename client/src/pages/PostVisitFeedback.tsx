import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Building, User } from "lucide-react";
import {useLocation} from "wouter";

export default function PostVisitFeedback() {
  const [, setLocation] = useLocation();
  const [centerRating, setCenterRating] = useState(0);
  const [consultantRating, setConsultantRating] = useState(0);
  const [centerComments, setCenterComments] = useState("");
  const [consultantComments, setConsultantComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [visitDetails] = useState({
    date: "June 19, 2025",
    time: "10:00 AM",
    center: "VHCC Dubai Marina",
    consultant: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    appointmentId: "APT-2024-001"
  });

  const StarRating = ({ rating, setRating, label }: { rating: number, setRating: (rating: number) => void, label: string }) => {
    return (
      <div className="space-y-2">
        <p className="font-medium text-slate-black">{label}</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1"
            >
              <Star
                size={24}
                className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {rating === 0 ? "Click to rate" : 
           rating === 1 ? "Poor" :
           rating === 2 ? "Fair" :
           rating === 3 ? "Good" :
           rating === 4 ? "Very Good" : "Excellent"}
        </p>
      </div>
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen  p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-neuro">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-healing-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <ThumbsUp className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-black mb-4">Thank You for Your Feedback!</h2>
              <p className="text-gray-600 mb-6">
                Your feedback helps us improve our services and provide better care for all patients.
              </p>
              <Button 
                onClick={() => setLocation(`/dashboard`)}
                className="bg-healing-green hover:bg-green-600 rounded-xl"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">Post-Visit Feedback</h1>
          <p className="text-gray-600">Share your experience to help us improve our services</p>
        </div>

        {/* Visit Summary */}
        <Card className="shadow-neuro mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="text-healing-green" size={24} />
              <span>Visit Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-semibold text-slate-black">{visitDetails.date}</p>
                <p className="text-sm text-gray-700">{visitDetails.time}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600">Medical Center</p>
                <p className="font-semibold text-slate-black">{visitDetails.center}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600">Consultant</p>
                <p className="font-semibold text-slate-black">{visitDetails.consultant}</p>
                <p className="text-sm text-gray-700">{visitDetails.specialty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Center Feedback */}
          <Card className="shadow-neuro">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="text-healing-green" size={24} />
                <span>Medical Center Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StarRating
                rating={centerRating}
                setRating={setCenterRating}
                label="Overall Center Rating"
              />

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-black mb-3">Rate specific aspects:</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Facility Cleanliness</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Staff Friendliness</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wait Time</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star size={16} className="text-gray-300" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Booking Process</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-black mb-2">
                    Additional Comments about the Center
                  </label>
                  <Textarea
                    placeholder="Share your thoughts about the medical center facilities, staff, or overall experience..."
                    value={centerComments}
                    onChange={(e) => setCenterComments(e.target.value)}
                    className="rounded-xl"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consultant Feedback */}
          <Card className="shadow-neuro">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="text-healing-green" size={24} />
                <span>Consultant Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StarRating
                rating={consultantRating}
                setRating={setConsultantRating}
                label="Overall Consultant Rating"
              />

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-black mb-3">Rate consultation aspects:</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Professional Manner</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Communication</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Diagnosis & Treatment</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Time Spent</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star size={16} className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-black mb-2">
                    Additional Comments about the Consultant
                  </label>
                  <Textarea
                    placeholder="Share your thoughts about the consultant's expertise, communication, or treatment approach..."
                    value={consultantComments}
                    onChange={(e) => setConsultantComments(e.target.value)}
                    className="rounded-xl"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation Section */}
        <Card className="shadow-neuro mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-black mb-2">Would you recommend VHCC?</h3>
                <p className="text-gray-600">Help others discover quality healthcare</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="rounded-xl flex items-center space-x-2">
                  <ThumbsDown size={16} />
                  <span>No</span>
                </Button>
                <Button className="bg-healing-green hover:bg-green-600 rounded-xl flex items-center space-x-2">
                  <ThumbsUp size={16} />
                  <span>Yes</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit}
            disabled={centerRating === 0 || consultantRating === 0}
            className="bg-healing-green hover:bg-green-600 rounded-xl px-8 py-3"
          >
            Submit Feedback
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Your feedback is anonymous and helps us improve our services
          </p>
        </div>
      </div>
    </div>
  );
}
