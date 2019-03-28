# Account Name Rule Description

On the GXChain network, user information is stored in an account object. Each account has a unique account id (example: `1.2.*`), and the account object contains the user's account name. On GXChain, there are custom rules. The following is a description of GXChain's rules:

- GXChain account name is limited to 1-63 characters

- GXChain account name must be in lowercase letters (beginning with a-z)

- The last letter of the GXChain account name is (0-9a-z)

- When `.` exists in the GXChain account name, each slice separated by `.` must start with a lowercase letter (a-z), the account `a.1` is invalid, and the account `a.b` is valid.

- GXChain account name can be used except for the first letter and the last letter (including `.` separated slices) (`a-z0-9-.`)

The following is the code for the account name verification:


```cpp
bool is_valid_name( const string& name )
{ try {
    const size_t len = name.size();

    if( len < GRAPHENE_MIN_ACCOUNT_NAME_LENGTH )
    {
        ilog(".");
        return false;
    }

    if( len > GRAPHENE_MAX_ACCOUNT_NAME_LENGTH )
    {
        ilog(".");
        return false;
    }

    size_t begin = 0;
    while( true )
    {
       size_t end = name.find_first_of( '.', begin );
       if( end == std::string::npos )
          end = len;
       if( (end - begin) < GRAPHENE_MIN_ACCOUNT_NAME_LENGTH )
       {
          idump( (name) (end)(len)(begin)(GRAPHENE_MAX_ACCOUNT_NAME_LENGTH) );
          return false;
       }
       switch( name[begin] )
       {
          case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
          case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
          case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
          case 'y': case 'z':
             break;
          default:
          ilog( ".");
             return false;
       }
       switch( name[end-1] )
       {
          case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
          case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
          case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
          case 'y': case 'z':
          case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7':
          case '8': case '9':
             break;
          default:
          ilog( ".");
             return false;
       }
       for( size_t i=begin+1; i<end-1; i++ )
       {
          switch( name[i] )
          {
             case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
             case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
             case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x':
             case 'y': case 'z':
             case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7':
             case '8': case '9':
             case '-':
                break;
             default:
                ilog( ".");
                return false;
          }
       }
       if( end == len )
          break;
       begin = end+1;
    }
    return true;
} FC_CAPTURE_AND_RETHROW( (name) ) }
```
