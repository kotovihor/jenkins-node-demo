pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Getting source code from repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t jenkins-node-demo:latest .'
            }
        }

        stage('Test Application') {
            steps {
                echo 'Running tests inside Docker container...'
                bat 'docker run --rm jenkins-node-demo:latest npm test'
            }
        }

        stage('Check Minikube') {
            steps {
                echo 'Checking Minikube and Kubernetes connection...'
                bat 'whoami'
                bat 'minikube profile list'
                bat 'minikube status'
                bat 'kubectl get nodes'
            }
        }

        stage('Load Docker Image to Minikube') {
            steps {
                echo 'Loading Docker image into Minikube...'
                bat 'minikube image load jenkins-node-demo:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying application to Minikube...'
                bat 'kubectl apply -f k8s/deployment.yaml'
                bat 'kubectl apply -f k8s/service.yaml'
                bat 'kubectl rollout restart deployment/jenkins-node-demo'
                bat 'kubectl rollout status deployment/jenkins-node-demo'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking Kubernetes resources...'
                bat 'kubectl get pods'
                bat 'kubectl get deployments'
                bat 'kubectl get svc'
            }
        }
    }
}