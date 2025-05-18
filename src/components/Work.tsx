
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application for task management with team collaboration features.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: '/placeholder.svg',
    demo: '#',
    github: '#',
    featured: true
  },
  {
    title: 'Analytics Dashboard',
    description: 'Interactive dashboard for visualizing complex data with customizable widgets.',
    tech: ['TypeScript', 'D3.js', 'Firebase'],
    image: '/placeholder.svg',
    demo: '#',
    github: '#',
    featured: true
  },
  {
    title: 'E-commerce Platform',
    description: 'Modern e-commerce solution with product management and payment processing.',
    tech: ['Next.js', 'Stripe', 'Tailwind CSS'],
    image: '/placeholder.svg',
    demo: '#',
    github: '#',
    featured: true
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform mobile application for fitness tracking and workout planning.',
    tech: ['React Native', 'Redux', 'Firebase'],
    image: '/placeholder.svg',
    demo: '#',
    github: '#',
    featured: false
  }
];

const Work: React.FC = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  
  return (
    <section id="work" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground">
            A collection of projects that showcase my skills and experience
            in software development and design.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        
        {otherProjects.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold heading mb-8 text-center">
              Other Noteworthy Projects
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} compact />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="px-6">
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact }) => {
  return (
    <Card className={cn(
      "overflow-hidden bg-secondary/50 border-muted hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      compact ? "h-full" : ""
    )}>
      {!compact && (
        <div className="h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <span 
              key={tech}
              className="bg-muted/50 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            Demo <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            Code <Github className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Work;
