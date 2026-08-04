from werkzeug.wrappers import Request, Response
from pdf2docx import Converter
import tempfile
import os

@Request.application
def app(request):
    if request.method != 'POST':
        return Response('Only POST is supported', status=405)
    
    if 'file' not in request.files:
        return Response('No file provided', status=400)
        
    file = request.files['file']
    if file.filename == '':
        return Response('No selected file', status=400)

    if file:
        # Create temporary files for the conversion process
        fd_pdf, pdf_path = tempfile.mkstemp(suffix=".pdf")
        fd_docx, docx_path = tempfile.mkstemp(suffix=".docx")
        
        try:
            # Save the uploaded PDF to the temp file
            file.save(pdf_path)
            
            # Convert PDF to DOCX
            cv = Converter(pdf_path)
            cv.convert(docx_path, start=0, end=None)
            cv.close()
            
            # Read the DOCX file
            with open(docx_path, "rb") as f:
                docx_data = f.read()
                
            # Create a response with the DOCX data
            original_filename = os.path.splitext(file.filename)[0]
            response = Response(
                docx_data,
                mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                headers={
                    'Content-Disposition': f'attachment; filename="{original_filename}.docx"'
                }
            )
            return response
            
        except Exception as e:
            return Response(f"Conversion error: {str(e)}", status=500)
            
        finally:
            # Clean up temp files
            os.close(fd_pdf)
            os.close(fd_docx)
            try:
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                if os.path.exists(docx_path):
                    os.remove(docx_path)
            except:
                pass
                
    return Response('Unknown error', status=500)
