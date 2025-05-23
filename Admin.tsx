import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { Mail, Phone, Clock, User, Settings, LogOut } from "lucide-react";
import { ContactSubmission } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import AdminLogin from "@/components/AdminLogin";
import SocialMediaManager from "@/components/SocialMediaManager";

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-yellow-100 text-yellow-800", 
  replied: "bg-green-100 text-green-800",
  resolved: "bg-gray-100 text-gray-800"
};

const statusLabels = {
  new: "New",
  read: "Read",
  replied: "Replied", 
  resolved: "Resolved"
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contact Form Submissions</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage customer inquiries and contact requests</p>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-600 text-center">
                Contact form submissions will appear here when customers reach out to you.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {submissions.map((submission) => (
              <Card key={submission.id} className="shadow-sm border-gray-200">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="space-y-3 sm:space-y-1">
                    {/* Title and Badge - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <CardTitle className="text-base sm:text-lg leading-tight">{submission.subject}</CardTitle>
                      <Badge className={`${statusColors[submission.status as keyof typeof statusColors]} w-fit`}>
                        {statusLabels[submission.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    
                    {/* Contact Info - Stack on mobile */}
                    <div className="space-y-2 sm:space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{submission.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{submission.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        {submission.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{submission.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{formatDistanceToNow(new Date(submission.createdAt!), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions - Full width on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-2 sm:pt-0">
                      <Select
                        value={submission.status}
                        onValueChange={(status) => 
                          updateStatusMutation.mutate({ id: submission.id, status })
                        }
                      >
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}`)}
                      >
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-3 sm:pt-4">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm sm:text-base">
                    {submission.message}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}