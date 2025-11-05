pipeline {
    agent any
    
    environment {
        S3_BUCKET = 'trng2309-7'
        AWS_REGION = 'us-east-2'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NickAndrews0808/Revature-Training-MovieReviewApp-FrontEnd.git'
            }
        }
        
        stage('Build React Frontend') {
            steps {
                dir('movie_review_app') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy Frontend to S3') {
            steps {
                dir('movie_review_app/dist') {
                    sh 'aws s3 sync . s3://${S3_BUCKET}/ --delete --region ${AWS_REGION}'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}