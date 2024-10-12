pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/mahmoudabohelwa/Depi-project', branch: 'main'
            }
        }

        stage('Build and Push Frontend') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERPASS', usernameVariable: 'DOCKERNAME')]) {
                    sh """
                    docker build -t mahmoudabohelwa3474/frontend:latest ./source_code/frontend
                    docker login -u ${DOCKERNAME} -p ${DOCKERPASS}
                    docker push mahmoudabohelwa3474/frontend:latest
                    """
                }
            }
        }

        stage('Build and Push Backend') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERPASS', usernameVariable: 'DOCKERNAME')]) {
                    sh """
                    docker build -t mahmoudabohelwa3474/backend:latest ./source_code/backend
                    docker login -u ${DOCKERNAME} -p ${DOCKERPASS}
                    docker push mahmoudabohelwa3474/backend:latest
                    """
                }
            }
        }

        stage('Configure AWS') {
            steps {
                script {
                
                     withCredentials([string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                     string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')])               
                    def awsAccessKey = credentials('aws-access-key')
                    def awsSecretKey = credentials('aws-secret-key')
                    
                    sh """
                    aws configure set aws_access_key_id ${awsAccessKey}
                    aws configure set aws_secret_access_key ${awsSecretKey}
                    aws configure set default.region ap-southeast-2  
                    """
                }
            }
        }

        stage('Terraform Destroy and Apply') {
            steps {
                dir('terraform') { 
                    sh """
                    terraform init
                    terraform destroy -auto-approve
                    terraform apply -auto-approve 
                    """
                }
            }
        }
    }
}
