provider "aws" {
  region = "ap-southeast-2" # Sydney region
}

# Create VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

# Create Public Subnet
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone = "ap-southeast-2a" # Adjust if needed based on the AZ in your region
}

# Create Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id
}

# Route Table for Internet Access
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_route" "default_route" {
  route_table_id         = aws_route_table.public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

# Associate Route Table with Public Subnet
resource "aws_route_table_association" "public_rt_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Security Group allowing access to SSH and HTTP
resource "aws_security_group" "app_sg" {
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # HTTP access from anywhere
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # SSH access from anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Allow all outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create EC2 instance
resource "aws_instance" "app_instance" {
  ami           = "ami-0cf70e1d861e1dfb8"  # Amazon Linux 2 AMI in ap-southeast-2 (Sydney)
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  key_name = "test"  # Replace with your actual EC2 key pair name

  # User Data to install Docker, Docker Compose, and start your app
  user_data = <<-EOF
              #!/bin/bash
              # Update the package list
              sudo yum update -y

              # Install Docker
              sudo amazon-linux-extras install docker -y

              # Start Docker service
              sudo systemctl start docker
              sudo systemctl enable docker

              # Add the ec2-user to the docker group to avoid using sudo with docker commands
              sudo usermod -aG docker ec2-user

              # Install Docker Compose
              sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose

              # Verify Docker and Docker Compose installation
              docker --version
              docker-compose --version

              # Clone the GitHub repository containing the docker-compose.yml file
              git clone https://github.com/kasssas/docker-compose.git /home/ec2-user/docker-app

              # Change directory to the cloned repository
              cd /home/ec2-user/docker-app

              # Run Docker Compose
              sudo docker-compose up -d

            EOF

  tags = {
    Name = "DockerAppInstance"
  }
}

# Output EC2 instance public IP for SSH and app access
output "ec2_public_ip" {
  value = aws_instance.app_instance.public_ip
}
