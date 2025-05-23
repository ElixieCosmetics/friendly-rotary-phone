import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Search, 
  Play, 
  Instagram, 
  Youtube,
  Clock,
  Tag
} from "lucide-react";
import { 
  SiSpotify, 
  SiX, 
  SiReddit, 
  SiTiktok,
  SiFacebook
} from "react-icons/si";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return Instagram;
      case "facebook": return SiFacebook;
      case "youtube": return Youtube;
      case "x": return SiX;
      case "tiktok": return SiTiktok;
      case "spotify": return SiSpotify;
      case "reddit": return SiReddit;
      default: return Instagram;
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Play;
      case "social": return Instagram;
      default: return Calendar;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter((post: any) => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag && post.status === 'published';
  });

  // Get all unique tags
  const allTags = Array.from(new Set(
    blogPosts.flatMap((post: any) => post.tags || [])
  ));

  return (
    <>
      <Helmet>
        <title>Lifestyle Blog - Elixíe</title>
        <meta name="description" content="Discover wellness tips, skincare routines, and natural beauty insights from Elixíe. Your guide to holistic living and radiant skin." />
        <meta property="og:title" content="Lifestyle Blog - Elixíe" />
        <meta property="og:description" content="Discover wellness tips, skincare routines, and natural beauty insights from Elixíe." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wellness & Beauty Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover natural skincare tips, holistic wellness practices, and lifestyle inspiration 
              to help you radiate beauty from within.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All Topics
                </Button>
                {allTags.map((tag: string) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedTag 
                    ? "Try adjusting your search or filter criteria."
                    : "Check back soon for wellness tips and beauty insights!"
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post: any) => {
                  const TypeIcon = getPostTypeIcon(post.type);
                  const PlatformIcon = post.socialPlatform ? getPlatformIcon(post.socialPlatform) : null;

                  return (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                      {/* Featured Image or Video Thumbnail */}
                      {post.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <TypeIcon className="h-3 w-3" />
                              {post.type === 'video' ? 'Video' : post.type === 'social' ? 'Social' : 'Article'}
                            </Badge>
                          </div>
                          {PlatformIcon && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                                <PlatformIcon className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent>
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;