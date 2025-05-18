
import TechGlobe from './TechGlobe';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold heading">
              <span className="block">Hi, I'm Jhon</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Full Stack Developer
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              I build exceptional digital experiences with modern technologies.
              Focused on creating innovative web solutions that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="px-6">
                See my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                Contact me
              </Button>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-4">
                {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'].map(tech => (
                  <div 
                    key={tech} 
                    className="bg-secondary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px]">
            <div className="absolute inset-0 animate-rotate-slow">
              <TechGlobe />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile tech globe */}
      <div className="md:hidden absolute inset-0 opacity-30 -z-0">
        <TechGlobe />
      </div>
    </section>
  );
};

export default Hero;
